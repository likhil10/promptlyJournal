import Axios from 'axios';
import { Platform } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function loginAction(userData) {
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
            type: 'LOG_IN'
        });
        Axios.post(`${Config.BASE_URL}/users/login`, userData, config)
            .then((response) => {
                if (response.status === Constant.HTTP_SUCCESS_CODE) {
                    dispatch({
                        error: null,
                        loginData: response.data.success.data,
                        type: 'LOG_IN_SUCCESS'
                    });
                }
                resolve(response.data.success.data);
            })
            .catch((error) => {
                const msg = fetchErrorMessage(error);
                dispatch({
                    error: msg,
                    loginData: null,
                    type: 'LOG_IN_ERROR'
                });
                reject(msg);
            });
    });
}
