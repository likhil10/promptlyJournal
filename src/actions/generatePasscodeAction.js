import Axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function generatePasscodeAction(userData) {
    return (dispatch) => new Promise((resolve, reject) => {
        AsyncStorage.getItem(Constant.TOKEN).then((token) => {
            const config = {
                headers: {
                    apiKey: Platform.OS === 'ios'
                        ? Config.IOS_API_KEY
                        : Config.ANDROID_API_KEY,
                    'Cache-Control': 'no-cache',
                    token
                }
            };
            dispatch({
                error: null,
                generatePasscodeData: null,
                type: 'GENERATE_PASSCODE'
            });
            Axios.post(`${Config.BASE_URL}/users/resetPasscode`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            generatePasscodeData: response.data.success.data,
                            type: 'GENERATE_PASSCODE_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        generatePasscodeData: null,
                        type: 'GENERATE_PASSCODE_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
