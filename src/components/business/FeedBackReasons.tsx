import React from "react";
import {
    TouchableHighlight,
    View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { TransText } from "react-native-translation";
import { themeEnum } from "../../constants/themeEnum";
import languages from '../../constants/languages.json'
import RadioButton from "../ui/RadioButton";
import { negativeFeedbackReasons } from "../../constants";

interface FeedbackReasonsProps {
    setReason: Function,
    selectedReason: string
}

const FeedbackReasons: React.FC<FeedbackReasonsProps> = ({ setReason, selectedReason }) => {
    return (
        <View className="gap-y-2  mt-1 mb-1">
            {negativeFeedbackReasons.map((item, i) => (
                <TouchableHighlight
                    className="rounded-md"
                    key={nanoid()}
                    onPress={() => {
                        setReason(item);
                    }}
                >
                    <View
                        style={{
                            backgroundColor: themeEnum.BODY_BACKGROUD_COLOR,
                        }}
                        className="h-12 rounded-md  flex-row items-center px-2"
                    >
                        <RadioButton
                            selected={selectedReason === item ? true : false}
                        />

                        <TransText
                            dictionary={languages.NegativeFeedBack.problems[i]}
                            className="ml-2"
                            style={{ color: themeEnum.FOCUSED_TEXT_COLOR }}
                        />
                    </View>
                </TouchableHighlight>
            ))}
        </View>
    );
};

export default FeedbackReasons;