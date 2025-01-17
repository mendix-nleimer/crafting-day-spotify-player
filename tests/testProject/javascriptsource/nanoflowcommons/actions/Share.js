// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Action to invoke the native sharing mechanism of the device.
 * @param {string} url - The url to share.
 * @param {string} text - The text to share.
 * @param {string} title - An optional title for the message or url to share. Only some share targets use this value.
 * @returns {Promise.<boolean>}
 */
export async function Share(url, text, title) {
	// BEGIN USER CODE
    if (!text && !url) {
        return Promise.reject(new Error("It is required to provide at least one of input parameters 'Text' and 'Url'"));
    }
    // Native platform
    // Documentation https://facebook.github.io/react-native/docs/share
    if (navigator && navigator.product === "ReactNative") {
        const RNShare = require("react-native").Share;
        const content =
            url && text ? { message: text + "\n" + url, title } : url ? { url, title } : { message: text, title };
        return RNShare.share(content).then(result => {
            if (result.action === RNShare.dismissedAction) {
                return false;
            }
            return true;
        });
    }
    // Web platform
    // Documentation https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
    if (navigator && navigator.share) {
        return navigator.share({ url, text, title }).then(() => true);
    }
    // Hybrid platform
    // Documentation https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
    if (window && window.plugins && window.plugins.socialsharing) {
        return new Promise((resolve, reject) => {
            window.plugins.socialsharing.shareWithOptions(
                {
                    message: text,
                    subject: title,
                    url
                },
                result => resolve(result.completed),
                errorMessage => reject(new Error(errorMessage))
            );
        });
    }
    if (document && document.location && document.location.protocol === "http:") {
        return Promise.reject(new Error("This action requires a secure https: connection"));
    }
    return Promise.reject(new Error("This action is not supported by this browser"));
	// END USER CODE
}
