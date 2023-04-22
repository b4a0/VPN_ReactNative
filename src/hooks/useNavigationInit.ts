import { useRef, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { detectVPN } from 'react-native-vpn-status';
import { checkDateTime } from '../api/firebase/checkDateTime';
import { fetchFreeVPN } from '../api/firebase/fetchFreeVPN';
import { setConfigFileFolder, setIsNetworkReachable, setIsFreeVpnListLoading, setIsSystemLanguage, setLocalUser, setActiveConnection } from '../store/reducers/vpnSlice';
import { downloadActiveVpnConfig } from '../utils/downloadActiveVpnConfig';
import { useAppSelector, useAppDispatch } from './redux';
import NetInfo from "@react-native-community/netinfo";
import RNFS from "react-native-fs";
import { NativeModules, Platform } from 'react-native';
import { getVerifiedDeviceLanguage } from '../utils/getVerifiedDeviceLanguage';
import { setCustomText } from 'react-native-global-props';
import { initUser } from '../constants';

const customTextProps = {
    style: {
        fontFamily: 'Montserrat-Medium'
    }
}
setCustomText(customTextProps);

export const useNavigationInit = () => {

    const deviceLanguage: string = (
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier).slice(0, 2);

    const checkedDeviceLanguage = getVerifiedDeviceLanguage(deviceLanguage);

    const { configFileFolder, isNetworkReachable, user, isFreeVpnListLoading } = useAppSelector(({ vpn }) => vpn);
    const configFileForlderRef = useRef(configFileFolder);
    configFileForlderRef.current = configFileFolder;
    const isNetworkReachableRef = useRef(isNetworkReachable);
    isNetworkReachableRef.current = isNetworkReachable;
    const dispatch = useAppDispatch();

    const setCurrentConfigFileFolder = async () => {
        await RNFS.getAllExternalFilesDirs()
            .then((res) => {
                dispatch(setConfigFileFolder(res[0]));
            })
            .catch((err) => err);
    };

    useEffect(() => {
        if (isNetworkReachableRef.current) {
            //get servers from firestore and call checkDateTime() once an hour
            AsyncStorage.getItem('lastFetchTime')
                .then(time => {
                    const hoursInit = {
                        hoursTime: new Date().getHours()
                    }
                    if (!time) {

                        AsyncStorage.setItem('lastFetchTime', JSON.stringify(hoursInit))
                        dispatch(fetchFreeVPN(true))
                    } else {
                        const hoursPrev = JSON.parse(time).hoursTime;
                        const hoursNow = new Date().getHours();

                        if (hoursNow !== hoursPrev) {
                            dispatch(fetchFreeVPN(true)).then(() => {
                                checkDateTime(dispatch)
                            })

                            AsyncStorage.setItem('lastFetchTime', JSON.stringify({
                                hoursTime: hoursNow,
                            }))

                        } else {
                            dispatch(fetchFreeVPN(false))
                        }
                    }
                })
        }
    }, [isNetworkReachable])

    useEffect(() => {
        const i = setInterval(() => {
            NetInfo.fetch().then((res) => {
                dispatch(setIsNetworkReachable(res.isInternetReachable));
                if (!res.isConnected) {
                    dispatch(setIsFreeVpnListLoading(false))
                }
            });
        }, 1000);
        return () => {
            clearInterval(i)
        }
    }, []);

    useEffect(() => {
        NetInfo.fetch()
            .then((res) => {
                dispatch(setIsNetworkReachable(res.isConnected))
            })
            .catch((err) => console.log(err));
        setCurrentConfigFileFolder();

        detectVPN().then(isVpnConnected => {

            AsyncStorage.getItem("User").then((res) => {
                if (res !== null) {
                    let value = JSON.parse(res);

                    if (value.language === "system") {
                        dispatch(setIsSystemLanguage(true))
                        value.language = checkedDeviceLanguage;
                        value.isSystemLanguage = true;
                    }
                    dispatch(setLocalUser(value));
                    if (
                        value.settings.connectionType === "last" &&
                        value.lastConnection.objectName !== ""
                    ) {
                        dispatch(setActiveConnection(value.lastConnection));
                        downloadActiveVpnConfig(
                            value.lastConnection,
                            configFileForlderRef.current
                        );
                    }
                    //If vpn already connected
                    else if (isVpnConnected &&
                        value.lastConnection.objectName !== "") {
                        dispatch(setActiveConnection(value.lastConnection));
                        downloadActiveVpnConfig(
                            value.lastConnection,
                            configFileForlderRef.current
                        );
                    }

                } else {
                    let initUserWithLanguage = { ...initUser, language: "system" }
                    // set default system language
                    initUserWithLanguage.isSystemLanguage = true;
                    const jsonValue = JSON.stringify(initUserWithLanguage);
                    AsyncStorage.setItem("User", jsonValue);
                    dispatch(setLocalUser({ ...initUserWithLanguage, language: checkedDeviceLanguage }));

                }
            });
        }).catch(console.log)


    }, []);

    return { isFreeVpnListLoading, user }
}