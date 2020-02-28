import { Platform } from 'react-native';
import Axios from 'axios';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function passcodeAction(userData) {
    return (dispatch) => new Promise((resolve, reject) => {
        const config = {
            headers: {
                apiKey: Platform.OS === 'ios'
                    ? Config.IOS_API_KEY
                    : Config.ANDROID_API_KEY,
                'Cache-Control': 'no-cache',
            }
        };
        dispatch({
            error: null,
            loginData: null,
            type: 'PASSCODE'
        });
        Axios.post(`${Config.BASE_URL}/users/passcode`, userData, config)
            .then((response) => {
                if (response.status === Constant.HTTP_SUCCESS_CODE) {
                    dispatch({
                        error: null,
                        type: 'PASSCODE_SUCCESS'
                    });
                }
                resolve(response.data.success.data);
            })
            .catch((error) => {
                const msg = fetchErrorMessage(error);
                dispatch({
                    error: msg,
                    loginData: null,
                    type: 'PASSCODE_ERROR'
                });
                reject(msg);
            });
    });
}
