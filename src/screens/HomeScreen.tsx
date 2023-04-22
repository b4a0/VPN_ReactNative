/* eslint-disable react-native/no-inline-styles */
import { View, Text } from "react-native";
import React from "react";
import { ConnectButton } from "../components/business/ConnectButton";
import { themeEnum } from "../constants/themeEnum";
import Ionicon from "react-native-vector-icons/Ionicons";
import CurrentIP from "../components/business/CurrentIP";
import ProtectionAlert from "../components/business/ProtectionAlert";
import SelectVpn from "../components/business/SelectVpn";
import { useConnectionStatus } from "../hooks/useConnectionStatus";

const HomeScreen = () => {
  const [showTextColor, showText, showIconColor] = useConnectionStatus();

  return (
    <View
      style={{ backgroundColor: themeEnum.BODY_BACKGROUD_COLOR }}
      className="w-full  h-full pt-3 pb-10 relative justify-between items-center"
    >
      <View className="flex-col items-center w-full" style={{ marginTop: 40 }}>
        <SelectVpn />
        <CurrentIP />
        <ProtectionAlert />
        <Text
          className="text-center mt-2"
          style={{
            paddingTop: 5,
            color: showTextColor,
            maxWidth: '85%',
          }}
        >
          {showText}
        </Text>
      </View>

      <Ionicon
        name="planet-outline"
        size={250}
        color={showIconColor}
        style={{ marginBottom: 60 }}
      />

      <View className="flex-col w-full items-center">
        <ConnectButton />
      </View>
    </View>
  );
};
export default HomeScreen;
