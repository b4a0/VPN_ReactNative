import {NativeModules} from 'react-native';

// Module checks if permission to use VPN is allowed

const {VpnPermissionDetect} = NativeModules;
interface VpnPermissionDetectInterface {
    vpnPermissionCheck(): Promise<boolean>;
}
export default VpnPermissionDetect as VpnPermissionDetectInterface;