import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function promptImageUpdateAction(userData) {
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
                promptImageUpdateData: null,
                type: 'PROMPT_IMAGE_UPDATE'
            });
            Axios.put(`${Config.BASE_URL}/journals`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            promptImageUpdateData: response.data.success.data,
                            type: 'PROMPT_IMAGE_UPDATE_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        promptImageUpdateData: null,
                        type: 'PROMPT_IMAGE_UPDATE_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}