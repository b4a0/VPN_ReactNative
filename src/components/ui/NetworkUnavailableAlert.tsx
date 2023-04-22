import React from 'react'
import { View } from 'react-native';
import { TransText } from 'react-native-translation';
import { themeEnum } from '../../constants/themeEnum';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const NetworkUnavailableAlert = () => (
    <View className="gap-y-3 flex items-center justify-center" style={{height:'95%'}}>
        <MaterialIcon
            name="error-outline"
            color={themeEnum.DARK_TEXT_COLOR}
            size={45}
        />
        <TransText
            dictionary={'Network.NetworkUnavailable'}
            className="text-xl"
            style={{ color: themeEnum.DARK_TEXT_COLOR }}
        />
    </View>
);

export default NetworkUnavailableAlert;