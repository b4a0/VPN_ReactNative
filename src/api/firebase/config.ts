import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAICPAJDFAbWZNOuhxSkD4nTS-_HiszTl0",
    authDomain: "open-source-vpn-github.firebaseapp.com",
    projectId: "open-source-vpn-github",
    storageBucket: "open-source-vpn-github.appspot.com",
    messagingSenderId: "1064398876150",
    appId: "1:1064398876150:web:9122ad4b497a3c666eebd7",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true
})

const data = collection(db, "data");
const feedback = collection(db, "feedback");
const settings = collection(db, "settings");

const storage = getStorage(app);
export { data, feedback, settings, storage }