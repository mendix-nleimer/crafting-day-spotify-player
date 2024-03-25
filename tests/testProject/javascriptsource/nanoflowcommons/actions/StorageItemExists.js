// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";
import AsyncStorage from "@react-native-community/async-storage";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Check if an item exists in a device storage, identified by a unique key. The value could be set by a Set Storage Item action.
 * @param {string} key - This field is required.
 * @returns {Promise.<boolean>}
 */
export async function StorageItemExists(key) {
	// BEGIN USER CODE
    if (!key) {
        return Promise.reject(new Error("Input parameter 'Key' is required"));
    }
    return getItem(key).then(result => result !== null);
    function getItem(key) {
        if (navigator && navigator.product === "ReactNative") {
            return AsyncStorage.getItem(key);
        }
        if (window) {
            const value = window.localStorage.getItem(key);
            return Promise.resolve(value);
        }
        return Promise.reject(new Error("No storage API available"));
    }
	// END USER CODE
}
