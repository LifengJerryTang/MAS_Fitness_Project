/**
 * This file contains functions that encapsulate the usage of AsyncStorage API to store data locally
 */
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Stores a piece of data in a key-value pair
 * @param key the key that we want to uniquely identify the value
 * @param value the input value
 * @returns {Promise<void>} because this function is an async function, it automatically returns a promise
 */
export const storeLocalData = async (key, value) => {
    await AsyncStorage.setItem(
        key,
        value
    );
};

/**
 * Gets a piece of data that was stored before
 * @param key the key that uniquely identifies the value stored
 * @returns {Promise<string>} because this function is an async function, it automatically returns a promise
 */
export const getLocalData = async (key) => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        return value;
    }

    return null;
};

/**
 * Removes a piece of data that was stored beforehand
 * @param key the key that uniquely identifies the value stored
 * @returns {Promise<void>} because this function is an async function, it automatically returns a promise
 */
export const removeLocalData = async (key) => {
    await AsyncStorage.removeItem(key);
}
