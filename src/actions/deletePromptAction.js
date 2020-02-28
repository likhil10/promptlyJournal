import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function deletePromptAction(journal_id, prompt_id) {
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
                deletePromptData: null,
                type: 'DELETE_PROMPT'
            });
            Axios.delete(`${Config.BASE_URL}/journals/${journal_id}/${prompt_id}`, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            deletePromptData: response.data.success.data,
                            type: 'DELETE_PROMPT_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        deletePromptData: null,
                        type: 'DELETE_PROMPT_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
