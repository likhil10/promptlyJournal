import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function editPromptImageAction(journal_id, prompt_id, userData) {
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
                editPromptImageData: null,
                type: 'EDIT_PROMPT_IMAGE'
            });
            Axios.put(`${Config.BASE_URL}/journals/image/${journal_id}/${prompt_id}`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            editPromptImageData: response.data.success.data,
                            type: 'EDIT_PROMPT_IMAGE_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        editPromptImageData: null,
                        type: 'EDIT_PROMPT_IMAGE_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
