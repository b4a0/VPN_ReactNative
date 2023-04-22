/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {themeEnum} from '../../constants/themeEnum';
function RadioButton(props: any) {
  return (
    <View
      style={[
        {
          height: 30,
          width: 30,
          borderRadius: 100,
          borderWidth: 3,
          borderColor: !props.selected
            ? themeEnum.TOOLS_INACTIVE_COLOR
            : themeEnum.SUCCESS_COLOR,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 6,
            backgroundColor: themeEnum.SUCCESS_COLOR,
          }}
        />
      ) : null}
    </View>
  );
}
export default RadioButton;
