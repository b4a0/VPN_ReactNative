import { useAppSelector } from "./redux";
//@ts-ignore
import { getTranslation } from 'react-native-translation';

export const useShowIp = () => {
    const { currentIP, currentServerIP, connectionState, activeConnection } = useAppSelector(
        ({ vpn }) => vpn
    );

    const ip = connectionState.state === 1 || currentIP.loading
        ? getTranslation('HomeScreen.IP.loading')
        : currentServerIP !== '' && connectionState.state === 2
            ? currentServerIP
            : currentIP.data.query
                ? currentIP.data.query
                : getTranslation('HomeScreen.IP.error');

    //iso Country Code
    const isoCode = connectionState.state === 1 || currentIP.loading
        ? activeConnection.country
        : currentServerIP !== '' && connectionState.state === 2
            ? activeConnection.country
            : currentIP.data.countryCode;

    return [ip, isoCode]
}