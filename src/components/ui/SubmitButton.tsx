import React from "react";
import {
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { TransText } from "react-native-translation";
import { themeEnum } from "../../constants/themeEnum";
import { FeedbackStatus } from "../../types";

interface SubmitButtonProps {
  handleSubmit: Function,
  feedbackStatus: FeedbackStatus
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ handleSubmit, feedbackStatus }) => {
  return (
    <TouchableHighlight
      underlayColor="none"
      //@ts-ignore
      onPress={handleSubmit}
      style={{ backgroundColor: themeEnum.SUCCESS_COLOR }}
      className="w-11/12 px-4 rounded-md h-12 flex mt-5 justify-center items-center"
    >
      {feedbackStatus === "loading"
        ? <ActivityIndicator size={35} color={"#fff"} />
        : <TransText className="color-white text-lg " dictionary={'NegativeFeedBack.sendButton'} />}
    </TouchableHighlight>
  );
};

export default SubmitButton;