import Axios from 'axios';
import { Platform } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function resetPasswordAction(userData) {
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
            resetPasswordData: null,
            type: 'RESET_PASSWORD'
        });
        Axios.post(`${Config.BASE_URL}/users/forgotPassword`, userData, config)
            .then((response) => {
                if (response.status === Constant.HTTP_SUCCESS_CODE) {
                    dispatch({
                        error: null,
                        resetPasswordData: response.data.success.data,
                        type: 'RESET_PASSWORD_SUCCESS'
                    });
                }
                resolve(response.data.success.data);
            })
            .catch((error) => {
                const msg = fetchErrorMessage(error);
                dispatch({
                    error: msg,
                    resetPasswordData: null,
                    type: 'RESET_PASSWORD_ERROR'
                });
                reject(msg);
            });
    });
}
