import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function savePromptAction(journal_id, prompt_id, userData) {
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
                savePromptData: null,
                type: 'SAVE_PROMPT'
            });
            Axios.put(`${Config.BASE_URL}/journals/prompt/save/${journal_id}/${prompt_id}`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            savePromptData: response.data.success.data,
                            type: 'SAVE_PROMPT_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        savePromptData: null,
                        type: 'SAVE_PROMPT_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
