import React from "react";
import { View, Text } from "react-native";
import CountryFlag from "react-native-country-flag";
//@ts-ignore
import { TransText } from 'react-native-translation';
import { useShowIp } from "../../hooks/useShowIp";
import { themeEnum } from "../../constants/themeEnum";
const CurrentIP = () => {
  
  const [ip, isoCode] = useShowIp()

  return (
    <View className="w-9/12 mt-3 flex-row items-end gap-x-2 justify-center" >
      <TransText
        dictionary={'HomeScreen.IP.ip'}
        style={{ fontSize: 13, color: themeEnum.IP_TEXT_COLOR }}
        className="text-xs"
      />
      <Text
        style={{ color: themeEnum.IP_TEXT_COLOR }}
        className="text-[13px] font-semibold"
      >
        {ip}
      </Text>
      <View className="rounded-full overflow-hidden h-4 w-4 flex justify-center items-center" style={{ marginBottom: 1 }}>
        <CountryFlag
          isoCode={isoCode}
          size={17}
        />
      </View>
    </View>
  );
};

export default CurrentIP;
