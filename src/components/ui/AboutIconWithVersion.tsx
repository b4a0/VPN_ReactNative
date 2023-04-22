import React from 'react';
import {View, Text} from 'react-native';
import {themeEnum} from '../../constants/themeEnum';
import Ionicon from 'react-native-vector-icons/Ionicons';
import VersionInfo from 'react-native-version-info';
//@ts-ignore
import {getTranslation} from 'react-native-translation';
const AboutIconWithVersion = () => {
  return (
    <View className="flex-col gap-y-2 items-center mt-8">
          <Ionicon
            name="planet-outline"
            size={80}
            color={themeEnum.FOCUSED_COLOR}
          />
          <Text
            style={{color: themeEnum.FOCUSED_TEXT_COLOR}}
            className="text-lg">
            {`${getTranslation('About.Version')} ${VersionInfo.appVersion}`}
          </Text>
    </View>
  );
};

export default AboutIconWithVersion;
