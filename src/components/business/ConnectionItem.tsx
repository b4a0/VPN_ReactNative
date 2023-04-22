/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableHighlight } from "react-native";
//@ts-ignore
import { getTranslation } from "react-native-translation";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { IConnection } from "../../types";
import { themeEnum } from "../../constants/themeEnum";
import languages from '../../constants/languages.json'
import CountryFlag from "react-native-country-flag";
import { useSelectServer } from "../../hooks/useSelectServer";

const ConnectionItem = ({ item }: { item: IConnection }) => {
  const {isConfigLoading, onSelectServer} = useSelectServer(item)

  return (
    <TouchableHighlight
      key={nanoid()}
      underlayColor={isConfigLoading ? "transparent" : themeEnum.FOCUSED_COLOR}
      className="pl-4 highIndex"
      onPress={onSelectServer}
    >
      <View>
        <View className="flex-row gap-x-3 h-14 items-center px-4">
          <View className="rounded-full  overflow-hidden h-6 w-6 flex justify-center items-center">
            <CountryFlag isoCode={item.country} size={25} />
          </View>
          <View className="flex-row gap-x-2-2 items-center h-full">
            <Text
              style={{
                color:
                  item.status === "active"
                    ? themeEnum.FOCUSED_TEXT_COLOR
                    : themeEnum.FOCUSED_COLOR,
                fontWeight: "500",
              }}
              className="text-[16px]"
            >
              {`${getTranslation(languages.SelectVpn.countries[item.country as keyof Object])} ${item.title}`}
            </Text>
            <Text
              style={{
                color:
                  item.status === "active"
                    ? themeEnum.FOCUSED_TEXT_COLOR
                    : themeEnum.FOCUSED_COLOR,
                fontWeight: "500",
              }}
              className="text-[16px]"
            >
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ConnectionItem;
