/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import CountryFlag from "react-native-country-flag";
import { useNavigation } from "@react-navigation/native";
//@ts-ignore
import { getTranslation } from "react-native-translation";
import { useAppSelector } from "../../hooks/redux";
import { themeEnum } from "../../constants/themeEnum";
import languages from '../../constants/languages.json'

const SelectVpn = () => {
  const navigation = useNavigation(); 
  const { activeConnection, isNetworkReachable, isConfigLoading } =
    useAppSelector(({ vpn }) => vpn); 
  return (
    <TouchableHighlight
      style={{ backgroundColor: themeEnum.FOCUSED_COLOR }}
      className="w-9/12 bg-pink-300 h-12 flex justify-center items-center rounded-md"
      onPress={() => {
        if (!isConfigLoading) {
          //@ts-ignore
          navigation.navigate("SelectVpn");
        }
      }}
      underlayColor="transparent"
    >
      <View className="flex  flex-row w-full justify-center gap-x-2 items-center h-fit">
        <View className="rounded-full  overflow-hidden h-4 w-4 flex justify-center items-center">
          {isNetworkReachable ? <CountryFlag
            isoCode={activeConnection.country}
            size={17}
          /> : <></>}
        </View>
        <View className="flex-row gap-x-2 justify-center items-center h-full">
          <Text
            style={{ color: themeEnum.FOCUSED_TEXT_COLOR, fontWeight: "500" }}
            className="text-[16px]"
          >
            {isNetworkReachable
              ? activeConnection.title
                ? `${getTranslation(languages.SelectVpn.countries[activeConnection.country as keyof Object])} ${activeConnection.title}`
                : ""
              : getTranslation('Network.NetworkError')}
          </Text>
        </View>

        <View className="rotate-180 ">
          <Ionicon
            name="triangle"
            size={8}
            color={themeEnum.FOCUSED_TEXT_COLOR}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SelectVpn;
