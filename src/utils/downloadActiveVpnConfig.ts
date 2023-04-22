import React from 'react';
import { IConnection } from "../types";
import RNFS from "react-native-fs";
export const downloadActiveVpnConfig = (item: IConnection, folder: string) => {
  if (item) {
    RNFS.downloadFile({
      fromUrl: `${item.url}`,
      toFile: `${folder}/${item.objectName}`,
    }).promise.catch(console.log);
  }
};
