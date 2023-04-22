import { CountryInfo, IUser, ServersAndCountries, UserLanguage } from './../../types/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IConnection } from "../../types/";
import { getCurrentIP } from "../../api/http";
import { downloadActiveVpnConfig } from "../../utils/downloadActiveVpnConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
//@ts-ignore
import {getTranslationWithLang} from 'react-native-translation';
import { fetchFreeVPN } from '../../api/firebase/fetchFreeVPN';
import { initUser, initialState } from '../../constants';

const vpnSlice = createSlice({
  name: "vpn",
  initialState,
  reducers: {
    createNewUser: (state, { payload }) => {
      state.user = { ...initUser, email: payload };
    },
    leaveAccount: (state) => {
      state.user = initUser;
    },

    openSupportPopup: (state) => {
      state.isOpenSupportPopup = true;
    },
    closeSupportPopup: (state) => {
      state.isOpenSupportPopup = false;
    },
    toggleKillswitch: (state) => {
      state.user.settings.killswitch = !state.user.settings.killswitch;
      const jsonValue = JSON.stringify(state.user)
      AsyncStorage.setItem('User', jsonValue);
    },
    setIsFirstConnection: (state, { payload }) => {
      state.user.isFirstConnection = payload;
      AsyncStorage.getItem("User")
        .then(user => {
          if (user) {
            let parseUser: IUser = JSON.parse(user)
            parseUser.isFirstConnection = payload;
            AsyncStorage.setItem("User", JSON.stringify(parseUser))
          }
        })
        .catch(console.log)
    },
    toggleAutoconnection: (state) => {
      state.user.settings.autoconnection = !state.user.settings.autoconnection;
      const jsonValue = JSON.stringify(state.user)
      AsyncStorage.setItem('User', jsonValue);
    },
    setConnectionType: (state,action: PayloadAction<'last'|'recommended'>) => {
      state.user.settings.connectionType = action.payload;
      const jsonValue = JSON.stringify(state.user)
      AsyncStorage.setItem('User', jsonValue);
    },
    setProtocol: (state, { payload }) => {
      state.user.settings.protocol = payload;
    },
    setVpnConnectionState: (state, { payload }) => {
      state.connectionState = payload;
    },
    setCurrentIP: (state, { payload }) => {
      state.currentIP = payload;
    },
    setLoadingCountryCode: (state, { payload }) => {
      state.currentIP = payload;
    },
    setIsConfigLoading: (state, { payload }) => {
      state.isConfigLoading = payload;
    },
    setActiveConnection: (state, { payload }) => {
      state.activeConnection = payload;
      state.user.lastConnection = payload;
    },
    setCurrentIPRejected: (state, { payload }) => {
      state.currentIP.rejected = payload;
    },
    setLocalUser: (state, { payload }) => {
      state.user = payload;
    },
    setFreeVpnList: (state, { payload }) => {
      state.freeVpnList = payload;
    },
    checkConnection: (state) => {
      if (state.connectionState.state === 1) {
        state.isBadConnection === true;
      }
    },
    setConfigFileFolder: (state, { payload }) => {
      state.configFileFolder = payload;
    },
    setConnectionStartTime: (state, { payload }) => {
      state.connectionStartTime = payload;
    },
    setIsNetworkReachable: (state, { payload }) => {
      state.isNetworkReachable = payload;
      if (payload === false) {
        state.currentIP.loading = false;
        state.currentIP.data.query = getTranslationWithLang(state.user.language,'Network.NetworkUnavailable');
      }
    },
    deleteServerById: (state, action: PayloadAction<String>) => {
      state.freeVpnList = state.freeVpnList.filter(server => server.id !== action.payload)
    },
    setCurrentServerIP: (state, action: PayloadAction<string>) => {
      state.currentServerIP = action.payload;
    },
    addServerToVpnList: (state, action: PayloadAction<IConnection>) => {
      state.freeVpnList.push(action.payload)
    },
    setCountries: (state, action: PayloadAction<CountryInfo[]>) => {
      state.countries = action.payload;
    },
    setIsFreeVpnListLoading: (state, action: PayloadAction<boolean>) => {
      state.isFreeVpnListLoading = action.payload
    },
    setIsRequestTimeout: (state, action: PayloadAction<boolean>) => {
      state.isRequestTimeout = action.payload
    },
    setIsActiveServersEmptyError: (state, action: PayloadAction<boolean>) => {
      state.isActiveServersEmptyError = action.payload
    },
    setUserLanguage: (state, action: PayloadAction<UserLanguage>) => {
      state.user.language = action.payload;
    },
    setIsSystemLanguage:(state, action: PayloadAction<boolean>) => {
      state.user.isSystemLanguage = action.payload;
    },
  },
  extraReducers: (builder) => { 
    builder 
      .addCase(getCurrentIP.fulfilled, (state, { payload }) => {
        if(payload.ip){
          payload.query = payload.ip
          payload.countryCode = state.activeConnection.country
        }else if(!payload.query){
          payload.query = getTranslationWithLang(state.user.language,'Network.GettingIPError');
        }
        state.currentIP.data = payload;      
        state.currentIP.loading = false;
      })
      .addCase(getCurrentIP.pending, (state) => {
        state.currentIP.loading = true;
      })
      .addCase(getCurrentIP.rejected, (state) => {
        state.currentIP.data.query = getTranslationWithLang(state.user.language,'Network.GettingIPError');
        state.currentIP.loading = false;
        state.currentIP.rejected = true;
      })
      .addCase(fetchFreeVPN.fulfilled, (state, action ) => {
        const payload = action.payload as ServersAndCountries;
        
        state.isFreeVpnListLoading = false; 
        state.countries = payload.countriesInfo;
        state.freeVpnList = payload.vpnList

        //set starting server
        if (state.user.settings.connectionType === 'recommended') {
          const recomendedServer = payload.vpnList.reduce((acc, server) => {

            if (server.status === 'active' && server.countSuccessConnection > 0) {
              if (server.countSuccessConnection > acc.countSuccessConnection) {
                return server
              }
            }

            return acc
          }, payload.vpnList[0])

          state.activeConnection = recomendedServer;
          downloadActiveVpnConfig(
            recomendedServer,
            state.configFileFolder)
        } else {
          state.activeConnection = state.user.lastConnection;
          downloadActiveVpnConfig(
            state.user.lastConnection,
            state.configFileFolder
          );

        }
      })
      .addCase(fetchFreeVPN.pending, (state) => {
        state.isFreeVpnListLoading = true
      })
      .addCase(fetchFreeVPN.rejected, (state) => {
        state.isFreeVpnListLoading = false
      });
  },

});

export const {
  setIsNetworkReachable,
  setIsConfigLoading,
  setFreeVpnList,
  setConfigFileFolder,
  setLocalUser,
  setCurrentIPRejected,
  setCurrentIP,
  setActiveConnection,
  createNewUser,
  leaveAccount,
  setVpnConnectionState,
  openSupportPopup,
  closeSupportPopup,
  toggleKillswitch,
  toggleAutoconnection,
  setConnectionType,
  setConnectionStartTime,
  setIsFirstConnection,
  setProtocol,
  setLoadingCountryCode,
  deleteServerById,
  setCurrentServerIP,
  addServerToVpnList,
  setCountries,
  setIsFreeVpnListLoading,
  setIsRequestTimeout,
  setIsActiveServersEmptyError,
  setUserLanguage,
  setIsSystemLanguage
} = vpnSlice.actions;

export default vpnSlice.reducer;
