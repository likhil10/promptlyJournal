import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function createCustomPromptAction(userData) {
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
                createCustomPromptData: null,
                type: 'CREATE_CUSTOM_PROMPT'
            });
            Axios.post(`${Config.BASE_URL}/prompts/custom`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            createCustomPromptData: response.data.success.data,
                            type: 'CREATE_CUSTOM_PROMPT_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        createCustomPromptData: null,
                        type: 'CREATE_CUSTOM_PROMPT_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
