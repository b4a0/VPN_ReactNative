/* eslint-disable react-native/no-inline-styles */
import { View, TouchableHighlight } from "react-native";
import React, { forwardRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { TransText } from "react-native-translation";
import { themeEnum } from "../../constants/themeEnum";
interface PermissionModalWindowProps {
 onPress:()=>void,
}

const PermissionModalWindow = forwardRef<RBSheet,PermissionModalWindowProps>(({onPress},ref) => {

  return (
    //@ts-ignore
    <RBSheet
          //@ts-ignore
          ref={ref}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
            container: {
              borderRadius: 12,
              backgroundColor: themeEnum.BODY_BACKGROUD_COLOR,
            },
            draggableIcon: {
              backgroundColor: "transparent",
            },
          }}
        >
          <View className="w-full flex-col items-center gap-y-5">
            <TransText
              dictionary={"HomeScreen.ConnectButton.permisson.title"}
              style={{ color: themeEnum.FOCUSED_TEXT_COLOR }}
              className="text-center text-lg font-semibold"
            />

            <TransText
              dictionary={"HomeScreen.ConnectButton.permisson.text"}
              style={{ color: themeEnum.FOCUSED_TEXT_COLOR, maxWidth:'94%' }}
              className="text-center px-2"
            />
            <TouchableHighlight
              style={{ backgroundColor: themeEnum.SUCCESS_COLOR }}
              className="w-11/12 h-14 flex justify-center items-center rounded-md "
              onPress={onPress}
              underlayColor={themeEnum.SUCCESS_COLOR}
            >
              <TransText dictionary={"HomeScreen.ConnectButton.permisson.ok"} className="color-white text-lg" />
            </TouchableHighlight>
          </View>
        </RBSheet>
  );
});
export default PermissionModalWindow;
