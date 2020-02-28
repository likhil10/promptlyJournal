import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';

export function savePushSettingsAction(userData) {
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
                savePushSettings: null,
                type: 'SAVE_PUSH_SETTINGS'
            });
            Axios.put(`${Config.BASE_URL}/users/setting/notification`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            savePushSettings: response.data.success.data,
                            type: 'SAVE_PUSH_SETTINGS_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        savePushSettings: null,
                        type: 'SAVE_PUSH_SETTINGS_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
