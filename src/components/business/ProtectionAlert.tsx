import React from 'react';
import {View} from 'react-native';
import { TransText } from 'react-native-translation';
import { useAppSelector } from '../../hooks/redux';
import { themeEnum } from '../../constants/themeEnum';

const ProtectionAlert = () => {
  const {connectionState} = useAppSelector(({vpn}) => vpn);
  if (connectionState.state === 2) {
    return (
      <View
        style={{backgroundColor: themeEnum.SUCCESS_COLOR}}
        className="mt-2 w-fit flex h-fit rounded-lg p-1">
        <TransText dictionary={'HomeScreen.ProtectionAlert.connected'} className="text-white text-xs" style={{paddingHorizontal:10,fontSize:13}}>Подключено</TransText>
      </View>
    );
  }else if(connectionState.state === 0){
    return (
      <View className="mt-2 w-fit flex h-fit bg-red-500 rounded-lg p-1">
        <TransText dictionary={'HomeScreen.ProtectionAlert.notСonnected'} className="text-white text-xs" style={{paddingHorizontal:10,fontSize:13}}>Не подключено</TransText>
      </View>
    );
  }else{
    return (
      <View
        style={{backgroundColor: themeEnum.ORANGE_COLOR}}
        className="mt-2 w-fit flex h-fit rounded-lg p-1" >
        <TransText dictionary={'HomeScreen.ProtectionAlert.connecting'} style={{paddingHorizontal:10,fontSize:13}} className="text-white text-xs">Подключение</TransText>
      </View>
    );
  }
};

export default ProtectionAlert;
