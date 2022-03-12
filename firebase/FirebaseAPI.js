import {db, auth} from "./firebase-config";
import {get, query, ref} from "firebase/database";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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

/**
 * Saves data to specified path location in the Realtime Database and append to
 * ezisting data
 * @param path path to key under which data should be stored
 * @param data data to be stored in json format
 * @returns void
 */
export const saveToDatabase = async (path, data) => {
    let currData = await getDataFromDatabase(path);
    if (currData) {
        for (const key in data) {
            currData[key] = data[key];
        }
        await set(ref(db, path), currData);
    } else {
        saveToDatabaseOverwrite(path, data);
    }
}

/**
 * Saves data to specified path location in the Realtime Database and overwrite data
 * @param path path to key under which data should be stored
 * @param data data to be stored in json format
 * @returns void
 */
export const saveToDatabaseOverwrite = async (path, data) => {
    await set(ref(db, path), data);
}

/**
 * A helper function that abstracts out the createUserWithEmailAndPassword function and parses error messages
 * @param email input user email
 * @param password input password
 * @param firstName input user first name
 * @param lastName input user last name
 * @returns {Promise<{firstName, lastName, email} | {firstname, classification, email, lastname}>}
 */
export const signup = (email, password, firstName, lastName) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        let newUser = {
            email: email,
            firstName: firstName,
            lastName: lastName
        }

        //Saves to the database first using user's uid as the path
        saveToDatabaseOverwrite(`users/${userCredential.user.uid}`, newUser);
        return newUser;

    }).catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
            throw new Error("This email is already in use!")
        } else {
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(error.message);
            let errorMessage = matches[1].split('/')[1].split("-").join(" ") + "!";
            throw new Error(errorMessage);
        }
    })
}

/**
 * Abstracts out the signInWithEmail and Password API provided by Firebase and parses error messages
 * @param email entered email address
 * @param password entered password
 * @returns {Promise<UserCredential>}
 */
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            let userPath =  'users/' + auth.currentUser.uid;
            let userData = getDataFromDatabase(userPath);

            return userData;

        }).catch((error) => {
            // Extract the actual error message from the error message returned from Firebase
            // for better display
            let regExp = /\(([^)]+)\)/;
            let matches = regExp.exec(error.message);
            let errorMessage = matches[1].split('/')[1].split("-").join(" ") + "!";

            // Encapsulates the extracted error message in a new Error object
            throw new Error(errorMessage);

        })
}

