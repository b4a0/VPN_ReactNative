/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { themeEnum } from "../../constants/themeEnum";
import AboutScreen from "../../screens/AboutScreen";
import HomeScreen from "../../screens/HomeScreen";
import NegativeFeedBackScreen from "../../screens/NegativeFeedBackScreen";
import SelectVpnScreen from "../../screens/SelectVpnScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import DriverHeaderLeft from "./DriverHeaderLeft";
import CustomWebView from "../ui/CustomWebView";
import languages from '../../constants/languages.json'
//@ts-ignore
import { getTranslation } from 'react-native-translation';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableHighlight } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { closeSupportPopup } from "../../store/reducers/vpnSlice";
import onShare from "../../utils/Share";
import DrawerHeader from "./DrawerHeader";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useAppDispatch } from "../../hooks/redux";
import DrawerContent from "../containers/DrawerContent";



const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const dispatch = useAppDispatch();

    return (
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            headerTitle: () => <DrawerHeader />,
            drawerContentContainerStyle: { paddingTop: 0 },
            drawerType: "front",
            headerTitleAlign: 'center',

            headerStyle: { backgroundColor: themeEnum.BODY_BACKGROUD_COLOR },
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableHighlight
                underlayColor="none"
                className=" pr-3"
                onPress={onShare}
              >
                <Ionicon
                  name="share-social"
                  size={25}
                  color={themeEnum.SUCCESS_COLOR}
                />
              </TouchableHighlight>
            ),
            headerLeft: () => (
              <TouchableHighlight
                className="pl-3"
                underlayColor="transparent"
                onPress={() => {
                  navigation.openDrawer();
                  dispatch(closeSupportPopup());
                }}
              >
                <EvilIcons name="navicon" size={30} color="#5579A8" />
              </TouchableHighlight>
            ),
          })}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} />

            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={() => ({
                    headerLeft: () => <DriverHeaderLeft route='Home' />,
                    headerTitle: getTranslation(languages.DrawerContent.settings),
                    headerTitleAlign: 'left',
                    headerTitleStyle: {
                        color: themeEnum.DARK_TEXT_COLOR,
                        fontWeight: "200",
                    },
                })}
            />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen
                name="SelectVpn"
                component={SelectVpnScreen}
                options={
                    () => ({
                        headerLeft: () => <DriverHeaderLeft route='Home' />,
                    })}
            />

            <Drawer.Screen
                name="NegativeFeedback"
                options={() => ({
                    headerLeft: () => <DriverHeaderLeft route='Home' />
                })}
                component={NegativeFeedBackScreen}
            />
            <Drawer.Screen
                options={() => ({
                    headerLeft: () => <DriverHeaderLeft route='About' />,
                })}
                name="PrivacyPolicy"
            >
                {() => <CustomWebView url='https://vpn.llill.xyz/privacyPolicy.html' />}
            </Drawer.Screen>
            <Drawer.Screen
                options={() => ({
                    headerLeft: () => <DriverHeaderLeft route='About' />,
                })}
                name="UseConditions"
            >
                {() => <CustomWebView url='https://vpn.llill.xyz/termsConditions.html' />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );

};

export default DrawerNavigator;
