import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import RNFS from "react-native-fs";
import { setIsActiveServersEmptyError, setCurrentIPRejected, setIsRequestTimeout, setIsConfigLoading, setActiveConnection } from "../store/reducers/vpnSlice";
import { useAppDispatch, useAppSelector } from "./redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IConnection } from "../types";


export const useSelectServer = (item: IConnection) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { configFileFolder, user, isConfigLoading } = useAppSelector(
    ({ vpn }) => vpn
  );
  const userRef = useRef(user);
  userRef.current = user;
  const isConfigLoadingRef = useRef(isConfigLoading);
  isConfigLoadingRef.current = isConfigLoading;

  const onSelectServer = () => {
    dispatch(setIsActiveServersEmptyError(false))
    dispatch(setCurrentIPRejected(false));
    dispatch(setIsRequestTimeout(false))
    if (isConfigLoadingRef.current) {
      return;
    } else {

      dispatch(setIsConfigLoading(true));
      dispatch(setActiveConnection(item));
      //@ts-ignore
      navigation.navigate("Home");
      RNFS.downloadFile({
        fromUrl: item.url,
        toFile: `${configFileFolder}/${item.objectName}`,
      })
        .promise.then((res) => {
          if (res.statusCode === 200) {
            const jsonValue = JSON.stringify({
              ...userRef.current,
              lastConnection: item,
            });
            AsyncStorage.setItem("User", jsonValue);

            dispatch(setIsConfigLoading(false));
          } else {
            console.log("error with download");
            dispatch(setIsConfigLoading(false));
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setIsConfigLoading(false));
        });
    }
  }

  return { isConfigLoading, onSelectServer }
}