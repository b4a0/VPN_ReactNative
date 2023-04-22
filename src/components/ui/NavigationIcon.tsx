import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const NavigationIcon = ({name}: any) => {
  return (
    <View style={{marginRight: -20}}>
      <Icon name={name} size={25} color="#5B789E" />
    </View>
  );
};
