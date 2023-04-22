/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Platform } from "react-native";
import {
    setActiveConnection,
    setConnectionStartTime,
    setCurrentServerIP,
    setFreeVpnList,
    setIsActiveServersEmptyError,
    setIsFirstConnection,
    setIsNetworkReachable,
    setIsRequestTimeout,
    setVpnConnectionState,
} from "../store/reducers/vpnSlice";
import { getCurrentIP } from "../api/http";
import { useState, useEffect, useRef } from "react";
import { setCurrentIPRejected } from "../store/reducers/vpnSlice";
import RNSimpleOpenvpn, {
    addVpnStateListener,
    removeVpnStateListener,
} from "react-native-simple-openvpn";
import { useAppDispatch, useAppSelector } from "./redux";
import NetInfo from "@react-native-community/netinfo";
import RNFS from "react-native-fs";
import { IConnection, IConnectionState } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { detectVPN } from 'react-native-vpn-status';
import VpnPermissionDetect from "../MyNativeModules/VpnPermissionDetect";
import { downloadActiveVpnConfig } from "../utils/downloadActiveVpnConfig";
import { useIsFocused } from '@react-navigation/native';
import { setFirestoreServers } from "../api/firebase/setFirestoreServers";
import { APIServers, IPwithLocationAPIUrl } from "../constants";
import RBSheet from "react-native-raw-bottom-sheet";

let checkConnectionTimeout: ReturnType<typeof setTimeout>;
let checkConnectionInterval: ReturnType<typeof setInterval>;
let notFocusedConnectionState: IConnectionState = {
    level: "",
    message: "",
    state: 0,
};
let isRequestTimeoutError = false;

export const useVpn = (refAllowVPNconfig: React.MutableRefObject<RBSheet | undefined>) => {
    const isFocused = useIsFocused();
    const isFocusedRef = useRef(isFocused);
    isFocusedRef.current = (isFocused);
    const [isFirstActiveConnection, setIsFirstActiveConnection] = useState(true);
    const [activeAPIServer, setActiveAPIServer] = useState<string>(() => APIServers[0])
    const dispatch = useAppDispatch();

    const [log, setLog] = useState("");
    const {
        currentIP,
        user,
        connectionState,
        activeConnection,
        configFileFolder,
        freeVpnList,
        connectionStartTime,
        isNetworkReachable,
        isConfigLoading,
        countries,
        currentServerIP
    } = useAppSelector(({ vpn }) => vpn);
    const connectionStateRef = useRef(connectionState);
    const isNetworkReachableRef = useRef(isNetworkReachable);
    const isConfigLoadingRef = useRef(isConfigLoading);

    const userRef = useRef(user);
    const currentIPRef = useRef(currentIP);
    const freeVpnListRef = useRef(freeVpnList);
    const activeConnectionRef = useRef(activeConnection);
    isConfigLoadingRef.current = isConfigLoading;
    freeVpnListRef.current = freeVpnList;
    activeConnectionRef.current = activeConnection;
    connectionStateRef.current = connectionState;
    isNetworkReachableRef.current = isNetworkReachable;

    userRef.current = user;
    currentIPRef.current = currentIP;

    //save server update after connection
    const setNewVpnList = (newServer: IConnection) => {
        const newFreeVpnList = [
            ...freeVpnListRef.current.filter(
                (el) => el.id !== newServer.id
            ),
            { ...newServer },
        ];

        if (newFreeVpnList.length < 5) {
            return;
        }

        dispatch(setFreeVpnList(newFreeVpnList));

        const jsonValue = JSON.stringify({
            ...user,
            lastConnection: newServer,
        });
        AsyncStorage.setItem("User", jsonValue);

        AsyncStorage.setItem("serversData", JSON.stringify({
            vpnList: newFreeVpnList,
            countriesInfo: countries
        }));

        setFirestoreServers(newFreeVpnList)
    }

    //checking if it can add +1 to the number of failed connections
    //add +1 only if not added +1 to this server from this user before
    const checkErrorCount = () => {
        return AsyncStorage.getItem(activeConnectionRef.current.id).then(res => {
            if (res === null) {
                AsyncStorage.setItem(activeConnectionRef.current.id, JSON.stringify({ addedCountError: true })).catch(console.log);
                return 1;
            }
            return 0;
        })

    }

    //setting error for current server
    const setConnectionError = async (errorType = "timeOutError") => {

        //set specific connection error
        await VpnPermissionDetect.vpnPermissionCheck().then(isPermissionAccepted => {
            if (isPermissionAccepted) {
                if (isNetworkReachableRef.current
                    && freeVpnListRef.current
                        .filter(server => server.country === activeConnection.country)
                        .filter(s => s.status === "active").length > 1 || !user.settings.killswitch) {
                    if (errorType === "timeOutError") {
                        dispatch(setIsRequestTimeout(true));
                    }
                    dispatch(setCurrentIPRejected(true));
                }
            }
        })

        if (activeConnectionRef.current.countErrorConnection > 9) {
            //set new current server
            dispatch(setActiveConnection(freeVpnList[0]));
            downloadActiveVpnConfig(freeVpnList[0], configFileFolder)
        } else {
            await checkErrorCount()
                .then(count => {
                    if (activeConnectionRef.current.status === "active" || count === 1) {
                        dispatch(
                            setActiveConnection({
                                ...activeConnectionRef.current,
                                countErrorConnection: activeConnectionRef.current.countErrorConnection + count,
                                status: "error",
                                lastConnectionTime: 0,
                            })
                        );
                    }

                })
                .catch(console.log)

        }
        setNewVpnList(activeConnectionRef.current)
    };

    //select another server and recconect if another active server of selected country exist
    const recconect = async (type: "current" | "recommended") => {

        let newActiveConnection = activeConnectionRef.current;
        if (type === "recommended") {

            const recommendedServers = freeVpnListRef.current
                .filter(server => server.country === activeConnection.country)
                .filter((server) => server.id !== activeConnection.id)
                .filter(server => server.status === "active");

            if (recommendedServers.length !== 0) {
                newActiveConnection = recommendedServers[0];
                dispatch(setCurrentIPRejected(false));
            } else {
                dispatch(setIsActiveServersEmptyError(true))
                stopOvpn()
            }

            dispatch(setActiveConnection(newActiveConnection));
        }
    }

    //handle activeConnection changing
    useEffect(() => {
        detectVPN().then(async isVPNConnected => {
            isRequestTimeoutError = false;
            if (activeConnection.title != "" && !isFirstActiveConnection && connectionState.state !== 0 || user.settings.autoconnection && !isVPNConnected) {
                if (isVPNConnected) {
                    await stopOvpn()
                }
                RNFS.downloadFile({
                    fromUrl: activeConnectionRef.current.url,
                    toFile: `${configFileFolder}/${activeConnectionRef.current.objectName}`,
                }).promise.then(() => {
                    startOvpn()
                })
            }
        })

    }, [activeConnection.title])

    //handle connecting without focus on Home Screen
    useEffect(() => {

        if (isFocused) {

            detectVPN().then(async isVpnConnected => {
                let connectionState = {
                    level: "",
                    message: "",
                    state: isVpnConnected ? 2 : 0,
                }
                if (isRequestTimeoutError) {
                    dispatch(setIsRequestTimeout(true))
                    await setConnectionError();
                    if (userRef.current.settings.killswitch) {
                        recconect("recommended")
                    } else {
                        stopOvpn()
                    }
                    isRequestTimeoutError = false;
                }
                if (
                    connectionState.state == 0 && connectionStateRef.current.state !== 0 && notFocusedConnectionState.state !== 1) {
                    dispatch(setVpnConnectionState(connectionState));
                }
                if (isVpnConnected && connectionStateRef.current.state !== 2) {
                    dispatch(setVpnConnectionState(connectionState));
                }
            })


        }
    }, [isFocused])



    //update connectionState
    //@ts-ignore
    useEffect(() => {
        async function observeVpn() {
            if (Platform.OS === "ios") {
                await RNSimpleOpenvpn.observeState();
            }
            addVpnStateListener((e) => {
                notFocusedConnectionState = e as IConnectionState;
                if (connectionStateRef.current.state !== e.state) {
                    if (isFocused) {
                        dispatch(setVpnConnectionState(e));
                        updateLog(JSON.stringify(e));
                    }
                }
            });
        }

        observeVpn();

        return async () => {
            if (Platform.OS === "ios") {
                await RNSimpleOpenvpn.stopObserveState();
            }

            removeVpnStateListener();
        };
    });


    //Handle connectionState changing
    // 0 - not Connected
    // 1 - Connecting
    // 2 - Connected
    // 3 - Disconnecting
    // 4 - Connecting error
    useEffect(() => {
        if (connectionStateRef.current.state === 0) {
            clearTimeout(checkConnectionTimeout);
            dispatch(getCurrentIP(IPwithLocationAPIUrl));
        } else if (connectionStateRef.current.state === 4) {
            setConnectionError("authError")
        } else if (connectionStateRef.current.state === 2) {
            // fetch to get ip if server without static ip
            if (currentServerIP === "") {
                if (currentIPRef.current.data.countryCode !== activeConnectionRef.current.country && !isFirstActiveConnection) {
                    dispatch(getCurrentIP(activeAPIServer));
                    checkConnectionInterval = setInterval(() => {
                        if (!currentIPRef.current.loading) {
                            if (APIServers.length > 1) {
                                //changing api to get ip every connection
                                setActiveAPIServer((prev) => APIServers.filter(s => s !== prev)[0])
                            }
                            clearInterval(checkConnectionInterval);
                        } else {
                            dispatch(getCurrentIP(activeAPIServer));
                        }
                    }, 5000)
                } else {
                    dispatch(getCurrentIP(activeAPIServer));
                    clearInterval(checkConnectionInterval);
                }
            }


            //set average connection time to server
            const lastConnectionTime = new Date().getSeconds() - connectionStartTime;
            const averageConnectionTime = ((activeConnectionRef.current.countSuccessConnection * activeConnectionRef.current.averageConnectionTime) + lastConnectionTime) / (activeConnectionRef.current.countSuccessConnection + 1)
            if (lastConnectionTime > 0) {
                const newActiveConnection = {
                    ...activeConnectionRef.current,
                    status: "active",
                    lastConnectionTime,
                    countErrorConnection: 0,
                    countSuccessConnection: activeConnectionRef.current.countSuccessConnection + 1,
                    averageConnectionTime
                }
                dispatch(
                    setActiveConnection(newActiveConnection)
                );

                setNewVpnList(newActiveConnection);
            }
        }
        return () => {
            clearInterval(checkConnectionInterval);
        }
    }, [connectionState.state]);

    useEffect(() => {
        if (!isNetworkReachableRef.current) {
            stopOvpn();
        } else if (!isFirstActiveConnection) {
            dispatch(getCurrentIP(IPwithLocationAPIUrl))
        }
    }, [isNetworkReachable]);

    //get IP from string from .ovpn file
    const getIPFromOvpn = (ovpnString: string) => {
        try {
            const ovpnLines = ovpnString.split(/\r?\n/)
            const [remoteSting] = ovpnLines.filter(string => string.slice(0, 6) === "remote")
            const ip = remoteSting.split(' ')[1]
            return ip
        } catch (e) {
            console.log(e)
            return ''
        }
    }

    async function startOvpn() {
        clearTimeout(checkConnectionTimeout);
        //set new lastConnection 
        const jsonValue = JSON.stringify({
            ...user,
            lastConnection: activeConnectionRef.current,
        });
        AsyncStorage.setItem("User", jsonValue);
        await NetInfo.fetch()
            .then(async () => {
                if (isNetworkReachableRef.current) {
                    //disable all errors after last connection
                    dispatch(setIsRequestTimeout(false))
                    dispatch(setIsActiveServersEmptyError(false))
                    dispatch(setCurrentIPRejected(false));
                    //mark the time
                    dispatch(setConnectionStartTime(new Date().getSeconds()));
                    try {
                        const ovpnString = await RNFS.readFile(
                            `${configFileFolder}/${activeConnectionRef.current.objectName}`
                        );
                        const ip = getIPFromOvpn(ovpnString)
                        //if server ip is static set server ip
                        if (Number.isInteger(parseInt(ip[0]))) {
                            dispatch(setCurrentServerIP(ip))
                        }
                        await RNSimpleOpenvpn.connect({
                            ovpnString,
                            notificationTitle: "Open source VPN",
                            compatMode: RNSimpleOpenvpn.CompatMode.OVPN_TWO_THREE_PEER,
                            providerBundleIdentifier: "free.vpn.unblock.proxy.opensource",
                            localizedDescription: "Open source VPN",
                        }).then(() => {
                            checkConnect()
                        }).catch((e) => {
                            console.log(e)
                            setConnectionError("ConnectError")
                        });
                    } catch (e) {
                        console.log('startOvpn error: ' + e)
                    }
                } else {
                    dispatch(setIsNetworkReachable(false));
                    stopOvpn();
                }
            })
            .catch((err) => console.log(err));
    }

    //function checks the connection status after 15 seconds from its start 
    const checkConnect = () => {
        checkConnectionTimeout = setTimeout(() => {
            detectVPN().then(async isVPNConnected => {
                if (isVPNConnected) {
                    if (connectionStateRef.current.state !== 2) {
                        dispatch(setVpnConnectionState({
                            level: "",
                            message: "",
                            state: 2,
                        }))
                    }
                } else {
                    if (isFocusedRef.current) {
                        await setConnectionError();
                        if (userRef.current.settings.killswitch) {
                            recconect("recommended")
                        } else {
                            stopOvpn()
                        }
                    } else {
                        notFocusedConnectionState = {
                            level: "",
                            message: "",
                            state: 0,
                        };
                        isRequestTimeoutError = true;
                    }
                    clearTimeout(checkConnectionTimeout);
                }
            }).catch(console.log)
        }, 15000);
    }

    //autoconnection after runnig the application
    useEffect(() => {
        detectVPN().then(isVPNConnected => {
            if (!isVPNConnected && user.settings.autoconnection && isFirstActiveConnection) {
                startOvpn();
            }
            setIsFirstActiveConnection(false);
        })
            .catch(console.log)
    }, [user.settings.autoconnection]);
    
    async function stopOvpn() {
        clearTimeout(checkConnectionTimeout);
        try {
            await RNSimpleOpenvpn.disconnect().then(() => {
                if (isNetworkReachable) {
                    if (connectionStateRef.current.state !== 0 && isFocusedRef.current) {
                        dispatch(setVpnConnectionState({
                            level: "",
                            message: "",
                            state: 0,
                        }))
                    }

                }
            });
        } catch (error) {
            updateLog(error);
        }
    }
    function updateLog(newLog: any) {
        const now = new Date().toLocaleTimeString();
        setLog(`${log}\n[${now}] ${newLog}`);
    }



    const onConnectButtonClick = ()=>{
        if (isNetworkReachableRef.current) {
          VpnPermissionDetect.vpnPermissionCheck().then(isPermissionAccepted => {
            if (!isPermissionAccepted) {
              //@ts-ignore
              refAllowVPNconfig.current.open();
            } else {
              if (connectionStateRef.current.state === 2 || connectionStateRef.current.state === 1) {
                stopOvpn();
              } else {
                if (!isConfigLoadingRef.current) {
                  startOvpn();
                }
              }
            }
          }).catch(console.log)
        }
      }


      const onVpnPermissionAllow = () => {
        //@ts-ignore
        refAllowVPNconfig.current.close();
        dispatch(setIsFirstConnection(false));
        if (activeConnectionRef.current.id !== "" && isNetworkReachableRef.current) {
          startOvpn();
        }
      }



    return {
        connectionStateRef,
        onVpnPermissionAllow,
        onConnectButtonClick,
    };
}