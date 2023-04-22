import React from "react";
import {
  View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";

import DropDownSelectList from "./DropDownSelectList";
import { CountryInfo, IConnection } from "../../types";

interface CountryListProps {
  searchedCountryServers: IConnection[][]
}

const CountryList: React.FC<CountryListProps> = ({ searchedCountryServers }) => {

  if (searchedCountryServers.length > 0) {
    return (
      <View className="flex-col ">
        {searchedCountryServers.map(servers =>
          <DropDownSelectList
            country={{ countryCode: servers[0].country } as CountryInfo}
            servers={servers}
            key={nanoid()}
          />
        )}
      </View>
    );
  }

  return <></>


};

export default CountryList;