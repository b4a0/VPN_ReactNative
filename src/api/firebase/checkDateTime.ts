//import firestore from "@react-native-firebase/firestore";
import { setStore } from './setStore';
import {settings} from './config'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

 //запуск функции проверки setStore, если не проверялось больше дня
export const checkDateTime = async (dispatch:any) => {
    const docCheckRef = doc(settings,'check');
    const checkData = await getDoc(docCheckRef)
    if(!checkData.data()){
      console.error("Response from firebase is undefined! Please read project description again and setup your firebase")
    }else{
      const timestamp = {
        seconds: checkData.data()?.lastCheckTime.seconds,
        nanoseconds: 0
      }
      //расчитываем разницу в днях между проверками
      const timestampSecondsNow = Math.floor(Date.now() / 1000);
      const days = Math.floor((timestampSecondsNow - timestamp.seconds) / 86400);

      if (days >= 1) {

        setTimeout(()=>setStore(dispatch),3000) 

        setDoc(docCheckRef,{
          lastCheckTime: serverTimestamp()
        })
      }
    }
  }
