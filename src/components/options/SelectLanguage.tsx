import React, { useState } from 'react';
import { IUser } from '../../types';
import DropDownPicker from "react-native-dropdown-picker";
import { Image, NativeModules, Platform, View } from 'react-native';
import { countryFlags } from '../../constants/countryFlags';
//@ts-ignore
import { getTranslationWithLang } from 'react-native-translation';
import { getVerifiedDeviceLanguage } from '../../utils/getVerifiedDeviceLanguage';
import { languageValues } from '../../constants';
import LanguageListItem from '../business/LanguageListItem';

// Список с выбором стран
const deviceLanguage: string = (
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier).slice(0, 2);

const checkedDeviceLanguage = getVerifiedDeviceLanguage(deviceLanguage)

const SelectLanguage: React.FC<IUser> = (user) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(() => user.isSystemLanguage ? "system" : user.language.toUpperCase());
    const [items, setItems] = useState([
        { label: getTranslationWithLang(checkedDeviceLanguage, 'systemLanguage'), value: "system" },
        ...languageValues
    ]);

    const imgSource = value === "system" ? countryFlags[checkedDeviceLanguage.toUpperCase()] : countryFlags[value];

    return (
        <View style={{
            maxWidth: '70%'
        }}
        >

            <DropDownPicker
                searchable={true}
                listMode='MODAL'
                placeholder={items.find(item => item.value === value)?.label}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}

                renderListItem={(item) => <LanguageListItem
                    item={item}
                    value={value}
                    setValue={setValue}
                    setOpen={setOpen}
                    checkedDeviceLanguage={checkedDeviceLanguage}
                    user={user}
                />}

                style={{
                    backgroundColor: "#CDDAF3",
                    borderWidth: 0,
                }}
                containerStyle={{
                    borderWidth: 0,
                }}
                placeholderStyle={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 20,
                }}
                arrowIconContainerStyle={{
                    borderColor: 'black',
                    borderWidth: 0.5,
                }}
                dropDownContainerStyle={{
                    //  maxWidth:"100%",
                    backgroundColor: "#CDDAF3",
                    borderWidth: 0,
                    borderColor: "#EFF3FB",
                    borderTopWidth: 1,
                    borderBottomWidth: 1
                }}
                textStyle={{
                    color: "black"
                }}
                showArrowIcon={true}
                ArrowUpIconComponent={() => <Image style={{ width: 48, height: 36 }} source={imgSource} />}
                ArrowDownIconComponent={() => <Image style={{ width: 48, height: 36 }} source={imgSource} />}
            />
        </View>


    )


};

export default SelectLanguage;