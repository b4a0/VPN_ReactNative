import React, { useEffect, useRef } from "react";
import {
    Keyboard,
    TextInput,
    View,
} from "react-native";
//@ts-ignore
import { TransText, getTranslation } from "react-native-translation";
import { themeEnum } from "../../constants/themeEnum";

interface SubmitInputProps {
    message: string,
    setMessage: Function,
}


const SubmitInput: React.FC<SubmitInputProps> = ({ message, setMessage }) => {

    const localInputRef = useRef<TextInput>();

    const keyboardDidHideCallback = () => {
        if (localInputRef) {
            localInputRef?.current?.blur?.();
        }
    }

    useEffect(() => {
        const keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHideCallback);

        return () => {
            keyboardDidHideSubscription?.remove();
        };
    }, []);

    return (
        <View className="flex-col gap-y-2">
            <TransText
                style={{ color: themeEnum.FOCUSED_TEXT_COLOR, textAlign: "center" }}
                dictionary={'NegativeFeedBack.textInput.title'}
            />
            <TextInput
                placeholder={getTranslation('NegativeFeedBack.textInput.placeHolder')}
                placeholderTextColor="#8e9399"
                ref={(ref) => {
                    localInputRef && (localInputRef.current = ref as any);
                }}
                onChangeText={(text) => setMessage(text)}
                value={message}
                style={{
                    backgroundColor: themeEnum.BODY_BACKGROUD_COLOR,
                    height: 110,
                    color: themeEnum.DARK_TEXT_COLOR,
                }}
                multiline={true}
                textAlignVertical="top"
                className="h-16 p-3 rounded-md"
            />
        </View>
    );
};

export default SubmitInput;