//@ts-ignore
import { getTranslation } from 'react-native-translation';
import { themeEnum } from '../constants/themeEnum';

export const useConnectButtonText = (state: number) => {
  
  const buttonText = state === 0
    ? getTranslation("HomeScreen.ConnectButton.connect")
    : state === 1
      ? getTranslation("HomeScreen.ConnectButton.cancel")
      : state === 2
        ? getTranslation("HomeScreen.ConnectButton.disconnect")
        : getTranslation("HomeScreen.ConnectButton.cancel");

  const buttonColor = state === 0
    ? themeEnum.SUCCESS_COLOR
    : state === 1
      ? themeEnum.CONNECTING_COLOR
      : state === 2
        ? themeEnum.CONNECTED_COLOR
        : themeEnum.SUCCESS_COLOR;

  return [buttonText, buttonColor]
}