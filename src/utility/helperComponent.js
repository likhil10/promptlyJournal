import { Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Constant from './constants';

// Function to return the proper error
export function fetchErrorMessage(error) {
    if (error.response && (error.response.status === Constant.HTTP_ERROR_CODE || error.response) && error.response.status === Constant.SERVER_NOT_FOUND) {
        return (Constant.REQ_FAILED);
    } else if (error.response && error.response.status === Constant.UNAUTHORIZED_ACCESS_FOUND_CODE) {
        return (Constant.UNAUTHORIZED_ACCESS_FOUND_CODE);
    }
    return error.response && error.response.data
        ? error.response.data.error.message
        : Constant.NETWORK_ERROR;
}

// Function to validate email
export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Function to validate Name
export function validateName(name) {
    const re = /^[a-zA-Z ]*$/;
    return re.test(name);
}

export function usPhoneNumberFormat(phoneNumber: string) {
    const format = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    return !format[2] ? format[1] : `(${format[1]}) ${format[2]}${format[3] ? `-${format[3]}` : ''}`;
}

export function validateNumber(number) {
    const re = /^[0-9 ]*$/;
    return re.test(number);
}

export function isValidUSZipcode(zipcodeUS) {
    const re = /^\d{5}(-\d{4})?$/;
    return re.test(zipcodeUS);
}

export function isEmpty(payLoad) {
    return payLoad === '';
}

export function equalString(str1, str2) {
    return str1 === str2;
}

export function openCameraAndGallery(index, mutipleImage) {
    if (index === 0) {
        return new Promise(((resolve, reject) => {
            ImagePicker.openCamera({
                mediaType: 'photo',
                width: 500,
                height: 400,
                compressImageQuality: 0.7,
                cropping: true,
                includeBase64: true,
                maxFiles: 10,
                multiple: mutipleImage,
                smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Videos', 'Bursts', 'Favorites']
            }).then(image => {
                // return this.uploadPhoto(image);
                resolve(image);
            })
                .catch(err => {
                    reject(err);
                });
        }));
    } else if (index === 1) {
        return new Promise(((resolve, reject) => {
            ImagePicker.openPicker({
                mediaType: 'photo',
                width: 500,
                height: 400,
                compressImageQuality: 0.7,
                cropping: true,
                maxFiles: 10,
                includeBase64: true,
                multiple: mutipleImage,
                smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Videos', 'Bursts', 'Favorites']
            }).then(image => {
                // this.uploadPhoto(image);
                resolve(image);
            })
                .catch(err => {
                    // this.displaySpinner(false);
                    reject(err);
                });
        }));
    }
    return true;
}


export function getWidth(uri) {
    Image.getSize(uri, (width, height) => ({ width: 100 * (width / height) }));
}


// Function to get image base64 data from image picker
export function uploadImage(callback) {
    callback(null, null);
    // const options = {
    //     quality: 1.0,
    //     maxWidth: 1024,
    //     maxHeight: 1024,
    //     storageOptions: {
    //         skipBackup: true
    //     }
    // };
    //
    // ImagePicker.showImagePicker(options, (response) => {
    //     if (response.didCancel) {
    //         console.info('User cancelled photo picker');
    //     }
    //     else if (response.error) {
    //         callback(response.error, null);
    //     }
    //     else if (response.customButton) {
    //         console.info('User tapped custom button: ', response.customButton);
    //     }
    //     else {
    //         let source;
    //         let imageData = 'data:image/jpeg;base64,' + response.data;
    //         if (Platform.OS === 'android') {
    //             source = response.uri;
    //         } else {
    //             source = response.uri.replace('file://', '');
    //         }
    //         callback(null, {imageData, source});
    //     }
    //
    // });
}

