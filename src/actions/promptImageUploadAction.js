import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function propmtImageUploadAction(journal_id, userData) {
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
                promptImageData: null,
                type: 'PROMPT_IMAGE_UPLOAD'
            });
            Axios.put(`${Config.BASE_URL}/journals/image/${journal_id}`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            promptImageData: response.data.success.data,
                            type: 'PROMPT_IMAGE_UPLOAD_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        promptImageData: null,
                        type: 'PROMPT_IMAGE_UPLOAD_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
