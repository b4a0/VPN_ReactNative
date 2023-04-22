import React from "react";
import { View } from "react-native";
import { Formik } from "formik";
import { themeEnum } from "../constants/themeEnum";
import { ScrollView } from "react-native-gesture-handler";
//@ts-ignore
import { TransText } from "react-native-translation";
import withInternetChecking from "../hoc/withInternetChecking";
import FeedbackStatusAlert from "../components/ui/FeedBackStatusAlert";
import SubmitButton from "../components/ui/SubmitButton";
import SubmitInput from "../components/ui/SubmitInput";
import FeedbackReasons from "../components/business/FeedBackReasons";
import { useNegativeFeedback } from "../hooks/useNegativeFeedback";

const NegativeFeedBackScreen = () => {
  const {
    feedbackStatus,
    reason, setReason,
    message, setMessage,
    onSubmit
  } = useNegativeFeedback()

  const initialValues = {
    problemType: reason,
    message: message,
  }

  return (
    <ScrollView className="h-screen bg-white" scrollEnabled={feedbackStatus !== "idle" ? false : true}>
      <View className=" w-full h-full">
        {feedbackStatus === "idle" || feedbackStatus === "loading" ? (
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
            }) => (
              <View className=" flex-col mt-5  items-center w-full" style={{ maxWidth: "99%" }}>
                <TransText
                  dictionary={'NegativeFeedBack.title'}
                  style={{ color: themeEnum.FOCUSED_TEXT_COLOR, maxWidth: "95%" }}
                  className="text-center font-semibold"
                />
                <View className="w-full pt-5   px-4 flex-col gap-y-2">
                  <FeedbackReasons selectedReason={reason} setReason={setReason} />
                  <SubmitInput message={message} setMessage={setMessage} />
                </View>
                <SubmitButton handleSubmit={handleSubmit} feedbackStatus={feedbackStatus} />
              </View>
            )}
          </Formik>
        ) : <FeedbackStatusAlert type={feedbackStatus} />
        }
      </View>
    </ScrollView>
  );
};

export default withInternetChecking(NegativeFeedBackScreen);
