import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import { TransText } from "react-native-translation";
import { useIsFocused } from "@react-navigation/native";
import { themeEnum } from "../../constants/themeEnum";
import languages from '../../constants/languages.json'
import SearchButton from "../ui/SearchButton";

interface SearchProps {
  searchValue: string,
  setSearchValue: Function
}

const Search: React.FC<SearchProps> = ({ searchValue, setSearchValue }) => {

  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSearchValue("")
      setIsActiveSearch(false)
    }
  }, [isFocused]);


  const togleSearch = () => {
    if (isActiveSearch) {
      setSearchValue("");
    }
    setIsActiveSearch(!isActiveSearch)
  }

  if (isActiveSearch) {
    return <>
      <TextInput
        onChangeText={(e) => setSearchValue(e)}
        value={searchValue}
        className="w-10/12 h-10 text-[#677BA0]  border-b-[1px] border-[#677BA0]"
      />
      <SearchButton IconComponent={MaterialIcon} name="cancel" size={28} togleSearch={togleSearch} />
    </>
  } else {
    return <>
      <View className="flex flex-row h-12 items-center gap-x-2">
        <MaterialIcon
          name="signal-cellular-alt"
          color={themeEnum.SUCCESS_COLOR}
          size={20}
        />
        <TransText style={{ color: themeEnum.FOCUSED_TEXT_COLOR }} dictionary={languages.SelectVpn.serversTitle} />
      </View>
      <SearchButton IconComponent={EvilIcon} name="search" size={34} togleSearch={togleSearch} />
    </>
  }
}

export default Search;