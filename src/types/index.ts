import { ImageSourcePropType } from "react-native";

export interface IConnectionState {
  level: string;
  message: string;
  state: number;
}
export type currentIPDataType = {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
};


export interface ICurrentIP {
  loadingCountryCode: string;
  data: currentIPDataType;
  loading: boolean;
  rejected: boolean;
}

export type UserLanguage  = "gb" | "ru" | "ua" | "jp" | "cn" | "in" | "kr" | "de" | "es" | "pt" | "id" | "";


export interface IUser {
  isSystemLanguage:boolean;
  language:UserLanguage;
  email: string;
  settings: {
    killswitch: boolean;
    autoconnection: boolean;
    connectionType: "last" | "recommended";
    protocol: "IKEv2" | "OpenVPN TCP" | "OpenVPN UDP";
  };
  isFirstConnection: boolean;
  lastConnection: IConnection;
  subscription: "free" | "premium";
}
export interface IConnection {
  title: string;
  country: string;
  url: string;
  status: string;
  objectName: string;
  id: string;
  lastConnectionTime: number;
  countErrorConnection:number;
  countSuccessConnection:number;
  averageConnectionTime:number;
  IP:string;
}

export interface CountryInfo{
  countryName:string
  countryCode:string,
}

export interface InitState {
  isActiveServersEmptyError:boolean;
  isRequestTimeout:boolean;
  isFreeVpnListLoading:boolean;
  currentServerIP:string;
  currentIP: ICurrentIP;
  countries:CountryInfo[];
  connectionState: IConnectionState;
  user: IUser;
  isOpenSupportPopup: boolean;

  negativeFeedBack: {
    reasons: string[];
  };
  isBadConnection: boolean;
  freeVpnList: IConnection[];
  activeConnection: IConnection;
  configFileFolder: string;
  connectionStartTime: number;
  isConfigLoading: boolean;
  isNetworkReachable: boolean;
  isActiveSearch: false;
}

export interface FormValues {
  problemType: string;
  message: string;
}

export interface CountryFlags {
  [key: string]: ImageSourcePropType
}

export interface DropDownSelectListProps {
  country: CountryInfo,
  servers: IConnection[],
}
export interface ServersAndCountries {
  countriesInfo: CountryInfo[],
  vpnList: IConnection[],
}

export type FeedbackStatus = "sent" | "idle" | "error" | "loading";

export interface DriverData {
  [key: string]: {
      icon: string,
      label: string,
      stateIndex?: number,
      onPress?: Function
  }
}


