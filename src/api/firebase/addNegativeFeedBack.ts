import { addDoc } from "firebase/firestore";
import { feedback } from "./config";
interface FeedBack{
    problemType: string,
    message: string
}

export const addNegativeFeedBack = (feedbackData:FeedBack) => {
    return addDoc(feedback,feedbackData)
}
