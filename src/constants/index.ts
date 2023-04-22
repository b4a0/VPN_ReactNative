import { IConnection, ICurrentIP, IUser, InitState, currentIPDataType } from "../types";

export const APIServers = [
    'https://ipv4.jsonip.com/',
    'http://ip.jsontest.com/'
]
//Place url api for get ip with location
//It must be api that return json with properties "ip" or "query" and "countryCode"
export const IPwithLocationAPIUrl = 'http://ip-api.com/json'

export const currentIPDataError: currentIPDataType = {
    as: "",
    city: "",
    country: "",
    countryCode: "",
    isp: "",
    lat: 0,
    lon: 0,
    org: "",
    query: "Ошибка получения IP",
    region: "",
    regionName: "",
    status: "",
    timezone: "",
    zip: "",
};

export const connectionError: IConnection = {
    title: "Error",
    country: "eu",
    url: "",
    status: "error",
    objectName: "",
    id: "1",
    lastConnectionTime: 0,
    countErrorConnection: 0,
    countSuccessConnection: 0,
    averageConnectionTime: 0,
    IP: '"'
};

export const initUser: IUser = {
    isSystemLanguage: false,
    language: "",
    email: "",
    settings: {
        killswitch: false,
        autoconnection: false,
        connectionType: "recommended",
        protocol: "OpenVPN TCP",
    },
    isFirstConnection: true,
    lastConnection: {
        id: "",
        title: "",
        status: "active",
        url: "",
        country: "",
        objectName: "",
        lastConnectionTime: 0,
        countErrorConnection: 0,
        countSuccessConnection: 0,
        averageConnectionTime: 0,
        IP: ""
    },
    subscription: "free",
};
export const initCurrentIP: ICurrentIP = {
    loadingCountryCode: "",
    data: {
        as: "",
        city: "",
        country: "",
        countryCode: "",
        isp: "",
        lat: 0,
        lon: 0,
        org: "",
        query: "",
        region: "",
        regionName: "",
        status: "",
        timezone: "",
        zip: "",
    },
    loading: false,
    rejected: false,
};
export const negativeFeedbackReasons = [
    "Проблема с подключением",
    "Неудобный интерфейс приложения",
    "Вопрос о регистрации или оплате",
    "Низкая скорость",
    "Нет нужной функции или сервера",
    "Предложения и идеи",
];
export const initialState: InitState = {
    isActiveServersEmptyError: false,
    isRequestTimeout: false,
    isFreeVpnListLoading: true,
    countries: [],
    currentServerIP: '',
    currentIP: initCurrentIP,
    user: initUser,
    activeConnection: {
        id: "",
        title: "",
        objectName: "",
        country: "",
        url: "",
        status: "active",
        lastConnectionTime: 0,
        countErrorConnection: 0,
        countSuccessConnection: 0,
        averageConnectionTime: 0,
        IP: ""
    },
    connectionState: {
        level: "",
        message: "",
        state: 0,
    },
    isBadConnection: false,
    freeVpnList: [],

    connectionStartTime: 0,
    isOpenSupportPopup: false,
    negativeFeedBack: {
        reasons: negativeFeedbackReasons,
    },
    configFileFolder: "",
    isConfigLoading: false,
    isNetworkReachable: false,
    isActiveSearch: false,
};

export const suportedLanguages = ['ua', 'ru', 'jp', 'cn', 'in', 'kr', 'de', 'es', 'pt', 'id']

export const languageValues = [
    { label: 'Русский', value: 'RU' },
    { label: 'Українська', value: 'UA' },
    { label: 'English', value: 'GB' },
    { label: '日本', value: 'JP' },
    { label: '中国人', value: 'CN' },
    { label: 'हिंदी', value: 'IN' },
    { label: '한국인', value: 'KR' },
    { label: 'Deutsch', value: 'DE' },
    { label: 'Español', value: 'ES' },
    { label: 'Português', value: 'PT' },
    { label: 'bahasa Indonesia', value: 'ID' },
]

export const COLLECTIONS = {
    DATA: {
        name : 'data',
        document:'servers'
    },
    FEEDBACK: 'feedback',
    SETTINGS:{
        name : 'settings',
        document:'check'
    }
  }
  