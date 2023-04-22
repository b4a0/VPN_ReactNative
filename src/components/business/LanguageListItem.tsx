import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { RenderListItemPropsInterface } from "react-native-dropdown-picker";
import { countryFlags } from "../../constants/countryFlags";
import { setUserLanguage, setIsSystemLanguage } from "../../store/reducers/vpnSlice";
import { IUser, UserLanguage } from "../../types";

//@ts-ignore
import { TranslationConsumer } from 'react-native-translation';
import { useAppDispatch } from "../../hooks/redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LanguageListItemProps{
    item:RenderListItemPropsInterface<string>,
    value:string,
    setValue:Function,
    setOpen:Function,
    checkedDeviceLanguage:UserLanguage,
    user:IUser,
}

const LanguageListItem:React.FC<LanguageListItemProps> = ({item,value,setValue,setOpen,checkedDeviceLanguage,user})=>{
    const dispatch = useAppDispatch();
    
    if(value === item.value){
        return <></>
    }

    const onSelectLanguage = (language:string , updateLanguage:Function)=>{
        const lowerValue = item.value.toLowerCase();
        setValue(item.value)
        setOpen(false)
        if (lowerValue !== language) {

            if(lowerValue === "system"){
                dispatch(setUserLanguage(checkedDeviceLanguage as UserLanguage))
                dispatch(setIsSystemLanguage(true))
                updateLanguage(checkedDeviceLanguage)
            }else{
                dispatch(setUserLanguage(lowerValue as UserLanguage))
                dispatch(setIsSystemLanguage(false))
                updateLanguage(lowerValue)
            }
           
            const jsonValue = JSON.stringify({
                ...user,
                language: lowerValue,
                isSystemLanguage: lowerValue === "system" ? true : false
            });
            AsyncStorage.setItem('User', jsonValue)
            
        }
    }


    return <TranslationConsumer>

        {({ language, updateLanguage }: any) => {
            return (<TouchableOpacity
                onPress={() => {
                    onSelectLanguage(language, updateLanguage)
                }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 10
                }}>
                    <Text style={{
                        fontFamily: 'Montserrat-Regular',
                        fontSize: 22,
                        marginLeft: 10,
                        width: '40%',
                        color: "black"
                    }}>{item.label} </Text>
                    <Image style={{
                        width: 48,
                        height: 36,
                        borderColor: 'black',
                        borderWidth: 0.5,
                        marginRight:10
                    }} source={item.value === "system" ? countryFlags[checkedDeviceLanguage.toUpperCase()] : countryFlags[item.value]} />
                </View>
            </TouchableOpacity>)
        }}

    </TranslationConsumer>
}

export default LanguageListItem;