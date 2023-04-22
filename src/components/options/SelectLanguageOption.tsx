import React from 'react';
import { View } from 'react-native';
import { TransText } from 'react-native-translation';
import { useAppSelector } from '../../hooks/redux';
import { themeEnum } from '../../constants/themeEnum';
import SelectLanguage from './SelectLanguage';

const SelectLanguageOption: React.FC = () => {
    const {user} = useAppSelector(({vpn}) => vpn);
    return (
        <View
        style={{borderColor: themeEnum.FOCUSED_COLOR,marginTop:20}}
        className="h-12 px-4  border-b  w-full flex-col justify-center items-center ">
        <View className="flex-row w-full  items-center  justify-between" style={{
          paddingBottom:20,
        }}>
        <TransText
            dictionary={"SettingsScreen.language"}
            style={{color: themeEnum.DARK_TEXT_COLOR ,fontWeight:"600",maxWidth:'30%', fontSize:16}}
            className="text-lg font-semibold"
            />
            <SelectLanguage {...user} />
        </View>
      </View>
    )
};

export default SelectLanguageOption;
