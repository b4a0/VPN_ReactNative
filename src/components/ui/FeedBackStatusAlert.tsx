import React from "react";
import {
    View,
} from "react-native";
import { TransText } from "react-native-translation";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { themeEnum } from "../../constants/themeEnum";

interface FeedbackStatusAlertProps {
    type: 'error' | 'sent';
}


const FeedbackStatusAlert: React.FC<FeedbackStatusAlertProps> = ({ type }) => {
    const iconName = type === 'error' ? "error-outline" : "done-outline";
    const color = type === 'error' ? "red" : themeEnum.SUCCESS_COLOR;
    const dictionary = type === 'error' ? 'NegativeFeedBack.formResult.error' : 'NegativeFeedBack.formResult.sent';
    return (
        <View className="w-full h-screen flex items-center justify-center">
            <MaterialIcon name={iconName} color={color} size={40} />
            <TransText className="text-center" style={{textAlign:'center',color}} dictionary={dictionary} />
        </View>
    );
};

export default FeedbackStatusAlert;