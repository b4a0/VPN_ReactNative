import { View, Image, Linking } from "react-native";
import React from "react";
import { themeEnum } from "../../constants/themeEnum";
import { styles } from "../../styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TransText } from "react-native-translation";
import languages from '../../constants/languages.json'
const LimitedAppAlert = () => {
  return (
    <View style={{ ...styles.flexCenter }}>
      <TransText
        style={{ color: themeEnum.FOCUSED_TEXT_COLOR, fontSize: 20, textAlign: 'center', maxWidth: '90%' }}
        dictionary={languages.SelectVpn.LimitedAppAlert}
        />
      <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=free.vpn.unblock.proxy.opensource')}>
        <Image
          source={{ uri: 'https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png' }}
          style={{ width: 320, height: 120 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LimitedAppAlert;
