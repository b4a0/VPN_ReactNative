import React, { useCallback, useState, memo } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useAppDispatch } from "../hooks/redux";

import withInternetChecking from "../hoc/withInternetChecking";
import CountryList from "../components/business/CountryList";
import Search from "../components/business/Search";
import { fetchFreeVPN } from "../api/firebase/fetchFreeVPN";
import { useSort } from "../hooks/useSort";
import { IConnection } from "../types";
import LimitedAppAlert from "../components/ui/LimitedAppAlert";

const SelectVpnScreen = memo(() => {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchValue, setSearchValue, searchedCountryServers] = useSort()

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    //получаем данные с firestore и обнавляем store
    await dispatch(fetchFreeVPN(true))

    setRefreshing(false)
  }, [refreshing]);

  return (
    <View className="w-full h-full justify-center flex-col items-center bg-white">
      <ScrollView nestedScrollEnabled={true} className="w-full flex-col gap-y-4" refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View className="mt-2 pl-6 w-full flex-row gap-2 items-center justify-between" style={{ marginLeft: -3 }}>
          <Search searchValue={searchValue as string} setSearchValue={setSearchValue as Function} />
        </View>
        <View className="flex-col gap-y-2 justify-start">
          <CountryList searchedCountryServers={searchedCountryServers as IConnection[][]} />
        </View>
          
        <View className="flex-col gap-y-2 justify-start">
            <LimitedAppAlert />
        </View>
          
        
      </ScrollView>

    </View>
  );


});


export default withInternetChecking(SelectVpnScreen);