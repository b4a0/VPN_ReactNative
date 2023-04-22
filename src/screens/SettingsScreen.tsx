/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { themeEnum } from '../constants/themeEnum';
import SwitchOption from '../components/options/SwitchOption';
import SelectStartServer from '../components/containers/SelectStartServer';
import SelectLanguageOption from '../components/options/SelectLanguageOption';
const SettingsScreen = () => {
  return (
    <View
      className="w-full h-full "
      style={{ backgroundColor: themeEnum.BODY_BACKGROUD_COLOR }}>
      <View className="w-full flex-col items-center " >
        <SwitchOption type='Reconnection' />
        <SwitchOption type='Autoconnection' />
        <SelectStartServer />
        <SelectLanguageOption />
      </View>
    </View>
  );
};

export default SettingsScreen;
