import React from 'react';
import { TouchableHighlight } from 'react-native';
import { themeEnum } from '../../constants/themeEnum';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
interface DriverHeaderLeftProps {
    route : string
}
const DriverHeaderLeft: React.FC<DriverHeaderLeftProps> = ({route}) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      className="ml-3"
      underlayColor="transparent"
      onPress={() => {
        //@ts-ignore
        navigation.navigate(route);
      }}
    >
      <Ionicon
        name="chevron-back"
        size={25}
        color={themeEnum.FOCUSED_TEXT_COLOR}
      />
    </TouchableHighlight>
  );
};

export default DriverHeaderLeft;
