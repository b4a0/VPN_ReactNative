import { Alert, Linking } from "react-native";
//@ts-ignore
import {getTranslationWithLang} from 'react-native-translation';
import languages from '../constants/languages.json'
import { UserLanguage } from "../types";

const openRateAlert = (navigation: any, language : UserLanguage) => {
  Alert.alert(
    getTranslationWithLang(language,languages.DrawerContent.rateTheApp.rateAlert.title),
    getTranslationWithLang(language,languages.DrawerContent.rateTheApp.rateAlert.text),
    [
      {
        text: getTranslationWithLang(language,languages.DrawerContent.rateTheApp.rateAlert.no),
        onPress: () => navigation.navigate("NegativeFeedback"),
        style: "destructive",
      },
      { text: getTranslationWithLang(language,languages.DrawerContent.rateTheApp.rateAlert.yes), onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.opensource')},
    ],
    { cancelable: true }
  );
};

export default openRateAlert;
