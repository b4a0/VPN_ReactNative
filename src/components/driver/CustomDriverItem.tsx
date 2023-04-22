/* eslint-disable react-native/no-inline-styles */
// @ts-nocheck
import React from "react";
import { themeEnum } from "../../constants/themeEnum";
import { DrawerItem } from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { NavigationIcon } from "../ui/NavigationIcon";
import {
    closeSupportPopup,
} from "../../store/reducers/vpnSlice";
//@ts-ignore
import { getTranslation } from 'react-native-translation';
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles";
import { driverData } from "../../constants/driverData";

interface CustomDriverItemProps {
    route: 'Home' | 'Settings' | 'ContactUs' | 'Share' | 'RateTheApp' | 'About',
    stateIndex: number
}

const CustomDriverItem: React.FC<CustomDriverItemProps> = ({ route, stateIndex }) => {
    const navigation = useNavigation()
    const { user } = useAppSelector(({ vpn }) => vpn);
    const dispatch = useAppDispatch();

    const onClickDrawer = () => {
        driverData[route].onPress
            ? driverData[route].onPress(navigation, user)
            : navigation.navigate(route)

        dispatch(closeSupportPopup());
    }

    return (
        <DrawerItem
            label={getTranslation(driverData[route].label)}
            labelStyle={{
                fontSize: 18,
                fontWeight: "700",
            }}
            style={
                stateIndex === driverData[route].stateIndex
                    ? {
                        ...styles.drawerItemStyle,
                        backgroundColor: themeEnum.FOCUSED_COLOR,
                    }
                    : { ...styles.drawerItemStyle }
            }
            icon={() => <NavigationIcon name={driverData[route].icon} />}
            onPress={onClickDrawer}
        />
    );
};

export default CustomDriverItem;
