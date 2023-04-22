import { View, TouchableHighlight } from 'react-native';
import React from 'react';
import { themeEnum } from '../../constants/themeEnum';
import { TransText } from 'react-native-translation';


interface PrivacyLinkProps{
    dictionary:string,
    onPress:()=>void
}
const PrivacyLink:React.FC<PrivacyLinkProps> = ({dictionary,onPress}) => {
    return (
        <View className="w-full flex-col items-center gap-y-6" style={{marginVertical:15}} >
            <TouchableHighlight
                underlayColor="none"
                //@ts-ignore
                onPress={onPress}
                style={{
                    borderColor: themeEnum.SUCCESS_COLOR,
                    margin: "10%"
                }}
                className="w-11/12 h-12 rounded-md flex justify-center items-center border">
                <TransText
                    dictionary={dictionary}
                    className="text-lg font-semibold"
                    style={{ color: themeEnum.SUCCESS_COLOR }}
                />
            </TouchableHighlight>
        </View>
    );
};

export default PrivacyLink;
