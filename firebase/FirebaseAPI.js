import {db} from "./firebase-config";
import {get, query, ref} from "firebase/database";

/**
 * Retrieves data from the Realtime Database with the specified path
 * @param path data's path
 * @return data retrieved from database
 */
export const getDataFromDatabase = async (path) => {
    let pathRef = ref(db, path);
    let pathQuery = query(pathRef)
    let dataSnapshot = await get(pathQuery);

    return dataSnapshot.val();
}
