import AsyncStorage from "@react-native-async-storage/async-storage";
import { nanoid } from "@reduxjs/toolkit";
import { setCountries, deleteServerById, setFreeVpnList } from "../../store/reducers/vpnSlice";
import { IConnection } from "../../types";
import languages from '../../constants/languages.json'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { data, storage } from "./config";
import { getDownloadURL, listAll, ref } from "firebase/storage";

export const setStore = async (dispatch: any) => {
  console.log("setStore")
  //Динамическое изменение firesore, в зависимости от добавленных или удаленных файлов .ovpn
  const docServersRef = doc(data, 'servers')
  let { servers } = (await getDoc(docServersRef)).data() as { servers: IConnection[] }

  if (servers) {
    const countries = Object.keys(languages.SelectVpn.countries).map(countryCode => {
      return { countryCode, countryName: '' }
    })
    dispatch(setCountries(countries))

    if (servers.length < 5) {
      return;
    }

    countries.forEach(country => {
      let countryServers = servers.filter(server => server.country === country.countryCode)
      const countryFolderRef = ref(storage, country.countryCode);

      // Find all the prefixes and items.
      listAll(countryFolderRef)
        .then(async (folder) => {
          if (!folder) {
            console.error("Response from firestore storage is undefined! Please read project description again and setup your firebase")
          }
          //проверка в случае не соответствия файлов .ovpn
          if (countryServers.length !== folder.items.length) {
            const fileNames = folder.items.map(file => file.name)

            //удаление серверов без файлов .ovpn
            countryServers = countryServers.filter(server => {
              if (!fileNames.includes(server.objectName)) {
                servers.splice(servers.findIndex(item => item.id === server.id), 1)
                dispatch(deleteServerById(server.id))
                return false;
              }
              return true;
            })

            //сервер с максимальным номером
            const maxTitleServer = countryServers.sort((a, b) => a.title < b.title ? 1 : -1)[0];
            //максимальный номер сервера страны
            const maxNumTitle = maxTitleServer ? parseInt(maxTitleServer.title) : 1
            //имена файлов в firestore, которые остались после удаления
            const objNames = countryServers.map(item => item.objectName)

            const urlsToNewServers = await folder.items.filter(file => !objNames.includes(file.name)).map(file => getDownloadURL(file))

            Promise.all(urlsToNewServers)
              .then(urls => {
                const newCountryServers = folder.items.filter(file => !objNames.includes(file.name)).map((file, i) => {
                  return {
                    status: "active",
                    url: urls[i],
                    objectName: file.name,
                    lastConnectionTime: 0,
                    countErrorConnection: 0,
                    countSuccessConnection: 0,
                    averageConnectionTime: 0,
                    IP: "",
                    country: country.countryCode,
                    title: `${maxNumTitle + 1 + i}`,
                    id: nanoid()
                  }
                })

                servers = [...servers, ...newCountryServers];

                dispatch(setFreeVpnList(servers))

                setDoc(docServersRef, { servers })

                AsyncStorage.setItem("serversData", JSON.stringify({
                  vpnList: servers,
                  countriesInfo: countries
                }))

              })
          }
        }).catch((error) => {
          console.log("Error setStore: ", error)
        });
    })

  } else {
    console.error("Response from firebase is undefined! Please read project description again and setup your firebase")
  }
}