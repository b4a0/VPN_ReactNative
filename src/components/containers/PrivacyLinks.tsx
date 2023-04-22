import { View, Linking } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PrivacyLink from '../ui/PrivacyLink';

const PrivacyLinks = () => {
  const navigation = useNavigation();
  return (
    <View className="w-full flex-col items-center gap-y-6" >
      <PrivacyLink
        dictionary={'About.links.PrivacyPolicy'}
        onPress={() => navigation.navigate('PrivacyPolicy' as never)}
      />
      <PrivacyLink
        dictionary={'About.links.UseConditions'}
        onPress={() => navigation.navigate('UseConditions' as never)}
      />
      <PrivacyLink
        dictionary={'About.links.openSource'}
        onPress={() => Linking.openURL('https://github.com/b4a0/VPN_ReactNative')}
      />
    </View>
  );
};

export default PrivacyLinks;
