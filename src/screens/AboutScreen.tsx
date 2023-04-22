import React from 'react';
import { View } from 'react-native';
import { themeEnum } from '../constants/themeEnum';
import PrivacyLinks from '../components/containers/PrivacyLinks';
import { ScrollView } from 'react-native-gesture-handler';
import AboutIconWithVersion from '../components/ui/AboutIconWithVersion';
const AboutScreen = () => {
  return (
    <ScrollView
      style={{ backgroundColor: themeEnum.BODY_BACKGROUD_COLOR }}
      className="w-full h-screen pt-10">
      <View className="w-full flex-col items-center h-fit">
        <AboutIconWithVersion />
        <View className="w-full h-full" style={{ marginTop: 90 }}>
          <PrivacyLinks />
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
