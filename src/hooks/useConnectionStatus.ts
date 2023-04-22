import { themeEnum } from "../constants/themeEnum";
import { useAppSelector } from "./redux";
//@ts-ignore
import { getTranslation } from 'react-native-translation';

export const useConnectionStatus = ()=>{
    const { connectionState, currentIP, isRequestTimeout, isActiveServersEmptyError, user } = useAppSelector(({ vpn }) => vpn);
    const showTextColor = isActiveServersEmptyError
      ? themeEnum.ORANGE_COLOR
      : currentIP.rejected
        ? themeEnum.RED_COLOR
        : currentIP.loading
          ? themeEnum.ORANGE_COLOR
          : themeEnum.RED_COLOR;
  
    const showText = isActiveServersEmptyError
      ? getTranslation("HomeScreen.ConnectionErrors.isActiveServersEmptyError")
      : isRequestTimeout && user.settings.killswitch
        ? getTranslation("HomeScreen.ConnectionErrors.isRequestTimeoutWithRecconect")
        : isRequestTimeout
          ? getTranslation("HomeScreen.ConnectionErrors.isRequestTimeout")
          : currentIP.rejected
            ? getTranslation("HomeScreen.ConnectionErrors.currentIPRejected")
            : currentIP.loading
              ? getTranslation("HomeScreen.ConnectionErrors.currentIPLoading")
              : "";
  
    const showIconColor = isActiveServersEmptyError
      ? themeEnum.FOCUSED_COLOR
      : currentIP.rejected
        ? themeEnum.RED_COLOR
        : connectionState.state === 0
          ? themeEnum.FOCUSED_COLOR
          : connectionState.state === 1
            ? themeEnum.ORANGE_COLOR
            : connectionState.state === 2
              ? themeEnum.SUCCESS_COLOR
              : themeEnum.FOCUSED_COLOR;
  
    return [showTextColor,showText,showIconColor]
}