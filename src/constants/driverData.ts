import openRateAlert from "../utils/RateAlert";
import onShare from "../utils/Share";
import { Platform } from 'react-native';
import email from 'react-native-email'
import VersionInfo from 'react-native-version-info';
//import DeviceInfo from 'react-native-device-info';
//@ts-ignore
import { getTranslationWithLang } from 'react-native-translation';
import { DriverData, IUser } from "../types";


export const driverData: DriverData = {
    Home: {
        icon: "home-outline",
        label: "DrawerContent.home",
        stateIndex: 0,
    },
    Settings: {
        icon: "settings-outline",
        label: "DrawerContent.settings",
    },
    ContactUs: {
        icon: "chatbox-ellipses-outline",
        label: "DrawerContent.contactUs.title",
        onPress: (navigation: any, user: IUser) => {
            try {
                //@ts-ignore
                const { Manufacturer, Model, Release: SystemVersion } = Platform.constants;
                email('vpn@llill.xyz', {
                    subject: 'Помощь',
                    body: `Device Manufacturer: ${Manufacturer}
Device Model: ${Model}
System Version ${SystemVersion}
PK: ${VersionInfo.bundleIdentifier}
Version: ${VersionInfo.appVersion}
Build: ${VersionInfo.buildVersion}
${getTranslationWithLang(user.language, "DrawerContent.contactUs.problemText")}: `,
                    checkCanOpen: false
                })
            } catch (e) {
                console.log("Email error: ", e)
            }
        }
    },
    Share: {
        icon: "gift-outline",
        label: "DrawerContent.share",
        onPress: () => {
            onShare();
        }
    },
    RateTheApp: {
        icon: "thumbs-up-outline",
        label: "DrawerContent.rateTheApp.title",
        onPress: (navigation: any, user: IUser) => {
            openRateAlert(navigation, user.language);
        }
    },
    About: {
        icon: "information-circle-outline",
        label: "DrawerContent.about",
        stateIndex: 2,
    },
}
