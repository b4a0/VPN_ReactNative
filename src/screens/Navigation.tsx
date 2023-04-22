/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { themeEnum } from "../constants/themeEnum";
import {  View, ActivityIndicator } from "react-native";
import languages from '../constants/languages.json'
import { LanguageProvider } from 'react-native-translation';
import { useNavigationInit } from "../hooks/useNavigationInit";
import DrawerNavigator from "../components/driver/DrawerNavigator";
import { CenteredLoader } from "../components/ui/CenteredLoader";


export const Navigation = () => {
  const { isFreeVpnListLoading, user } = useNavigationInit()

  if (isFreeVpnListLoading && user.language === "") {
    return <CenteredLoader size={50} color={themeEnum.DARK_TEXT_COLOR} />
  }

  return (
    <LanguageProvider language={user.language} translations={languages}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}; 