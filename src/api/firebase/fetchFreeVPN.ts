import { createAsyncThunk } from "@reduxjs/toolkit";
import { IConnection } from "../../types";
//import firestore from "@react-native-firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import languages from '../../constants/languages.json'
import { data } from './config';
import { doc, getDoc } from 'firebase/firestore';

export const fetchFreeVPN = createAsyncThunk('freeVpnList/fetchFreeVPN', async (isTimeToRequest: boolean) => {
  if (isTimeToRequest) {
    const docServersRef = doc(data, 'servers')
    let { servers } = (await getDoc(docServersRef)).data() as { servers: IConnection[] }
    if (!servers) {
      console.error("Response from firebase is undefined! Please read project description again and setup your firebase")
    }
    const countries = Object.keys(languages.SelectVpn.countries).map(countryCode => {
      return { countryCode, countryName: '' }
    })
    AsyncStorage.setItem("serversData", JSON.stringify({
      vpnList: servers,
      countriesInfo: countries
    }))
    return { vpnList: servers, countriesInfo: countries }
  } else {
    //если время получения данных с firestore еще не пришло, получаем их с AsyncStorage
    return AsyncStorage.getItem("serversData")
      .then(res => {
        if (res) {
          const parseRes = JSON.parse(res)
          return { vpnList: parseRes.vpnList as IConnection[], countriesInfo: parseRes.countriesInfo }
        } else {
          return { vpnList: [] as IConnection[], countriesInfo: [] }
        }
      })
      .catch(console.log)
  }
});