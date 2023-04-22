import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { themeEnum } from '../../constants/themeEnum';
import { TransText } from 'react-native-translation';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setConnectionType } from '../../store/reducers/vpnSlice';
import RadioButton from '../ui/RadioButton';
interface RadioOptionProps {
    type: "last" | "recommended"
}
const RadioOption: React.FC<RadioOptionProps> = ({ type }) => {
    const { user } = useAppSelector(({ vpn }) => vpn);
    const dispatch = useAppDispatch();
    return (
        <TouchableHighlight
          underlayColor="none"
          onPress={() => dispatch(setConnectionType(type))}
          style={{borderColor: themeEnum.FOCUSED_COLOR,marginTop:20}}
          className="h-12 px-4  border-b  w-full flex-col justify-center items-center ">
          <View className="flex-row w-full  items-center  justify-between" style={{paddingBottom:20}}>
            <TransText
              dictionary={type === 'last' ? "SettingsScreen.connectionType.last" : "SettingsScreen.connectionType.recommended"}
              style={{color: themeEnum.DARK_TEXT_COLOR ,fontWeight:"600", fontSize:16}}
              className="text-lg font-semibold"
              />
            <RadioButton
              selected={user.settings.connectionType === type ? true : false}
            />
          </View>
        </TouchableHighlight>
    );
};

export default RadioOption;
