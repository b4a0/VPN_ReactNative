import { doc, setDoc } from "firebase/firestore";
import { data } from "./config";
import { IConnection } from "../../types";

export const setFirestoreServers = (serversData:IConnection[]) => {
    const docServersRef = doc(data, 'servers')
    return setDoc(docServersRef,{servers:serversData})
}
