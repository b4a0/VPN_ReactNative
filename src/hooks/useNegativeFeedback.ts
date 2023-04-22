import { useEffect, useState } from "react";
import { addNegativeFeedBack } from "../api/firebase/addNegativeFeedBack";
import { negativeFeedbackReasons } from "../constants";
import { FeedbackStatus } from "../types";
import { useIsFocused } from "@react-navigation/native";

export const useNegativeFeedback = () => {

    const [feedbackStatus, setFeedbackStatus] = useState<FeedbackStatus>("idle");
    const isFocused = useIsFocused();

    const [reason, setReason] = useState<string>(
        () => negativeFeedbackReasons[0]
    );
    const [message, setMessage] = useState<string>("");

    const resetFormValues = () => {
        setReason(negativeFeedbackReasons[0]);
        setMessage("");
    };

    useEffect(() => {
        if (!isFocused) {
            resetFormValues();
        }
    }, [isFocused]);


    const onSubmit = () => {
        setFeedbackStatus("loading")
        addNegativeFeedBack({
            problemType: reason,
            message: message,
        })
            .then(() => {
                setFeedbackStatus("sent");
                setTimeout(() => {
                    setFeedbackStatus("idle");
                }, 5000);
                setTimeout(() => resetFormValues(), 1500)
            })
            .catch(() => {
                setFeedbackStatus("error");
                setTimeout(() => {
                    setFeedbackStatus("idle");
                }, 5000);
            });
        setTimeout(() => resetFormValues(), 1500)
    }
    return { feedbackStatus, reason, setReason, message, setMessage, onSubmit }
}