/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef, Ref } from "react";
import PermissionModalWindow from "../ui/PermissionModalWindow";
import { useConnectButtonText } from "../../hooks/useConnectButtonText";
import { useVpn } from "../../hooks/useVpn";


export const ConnectButton = () => {

  const refAllowVPNconfig = useRef<RBSheet>();

  const {
    connectionStateRef,
    onVpnPermissionAllow,
    onConnectButtonClick,
  } = useVpn(refAllowVPNconfig)

  const [buttonText, buttonColor] = useConnectButtonText(connectionStateRef.current.state)

  return (
    <TouchableOpacity
      onPress={onConnectButtonClick}
      className="w-9/12 h-12 mb-4  flex justify-center items-center rounded-md"
      style={{
        backgroundColor: buttonColor,
      }}
      activeOpacity={0.4}
    >
      <View className="w-full h-full flex-row gap-x-2 justify-center items-center" >
        {connectionStateRef.current.state === 0
          && <Ionicon color="white" name="rocket" size={22} />}

        <Text className="text-white font-semibold text-[16px] " >
          {buttonText}
        </Text>

        <PermissionModalWindow
          ref={refAllowVPNconfig as Ref<RBSheet> | undefined}
          onPress={onVpnPermissionAllow} />
      </View>
    </TouchableOpacity>
  );
};

