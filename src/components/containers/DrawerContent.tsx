/* eslint-disable react-native/no-inline-styles */
import { View } from "react-native";
import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { themeEnum } from "../../constants/themeEnum";
import CustomDriverItem from "../driver/CustomDriverItem";

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <View
      style={{ backgroundColor: themeEnum.BODY_BACKGROUD_COLOR }}
      className="h-full bg-black flex-col justify-between py-3"
    >
      <View className="flex-col justify-start gap-0">
        <CustomDriverItem route='Home' stateIndex={props.state.index}/>
        <CustomDriverItem route='Settings' stateIndex={props.state.index}/>
        <CustomDriverItem route='ContactUs' stateIndex={props.state.index}/>
        <CustomDriverItem route='Share' stateIndex={props.state.index}/>
        <CustomDriverItem route='RateTheApp' stateIndex={props.state.index}/>
        <CustomDriverItem route='About' stateIndex={props.state.index}/>
      </View>
    </View>
  );
};

export default DrawerContent;
