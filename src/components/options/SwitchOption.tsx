import React from 'react';
import { View } from 'react-native';
import { themeEnum } from '../../constants/themeEnum';
import { TransText } from 'react-native-translation';
import { Switch } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleAutoconnection, toggleKillswitch } from '../../store/reducers/vpnSlice';
interface SwitchOptionProps {
    type: "Reconnection" | "Autoconnection"
}
const SwitchOption: React.FC<SwitchOptionProps> = ({ type }) => {
    const { user } = useAppSelector(({ vpn }) => vpn);
    const dispatch = useAppDispatch();
    return (
        <View
            style={{ borderColor: themeEnum.FOCUSED_COLOR, }}
            className="h-25 px-4 py-2 border-b border-t w-full flex-col justify-between">
            <View className="flex-row w-full  items-center  justify-between" >
                <TransText
                    dictionary={type === "Reconnection" ? "SettingsScreen.reconnection.title" : "SettingsScreen.autoConnection.title"}
                    style={{ color: themeEnum.DARK_TEXT_COLOR, marginBottom: 10, marginTop: 5, fontWeight: "600", fontSize: 16 }}
                    className=" font-semibold"
                />
                <Switch
                    trackColor={{
                        true: themeEnum.SUCCESS_COLOR,
                        false: themeEnum.DARK_TEXT_COLOR,
                    }}
                    //@ts-ignore
                    onValueChange={() => {
                        type === "Reconnection" ? dispatch(toggleKillswitch()) : dispatch(toggleAutoconnection());
                    }}
                    value= { type === "Reconnection" ? user.settings.killswitch : user.settings.autoconnection }
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: 16,
                    }}
                />
            </View>
            <TransText style={{ color: 'grey', }}
                className="text-xs w-full"
                dictionary={type === "Reconnection" ? "SettingsScreen.reconnection.text" : "SettingsScreen.autoConnection.text"}
            />
        </View>
    );
};

export default SwitchOption;
