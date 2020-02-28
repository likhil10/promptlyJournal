import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function getPromptsAction(userData) {
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
                promptsData: null,
                type: 'GET_PROMPTS'
            });
            Axios.get(encodeURI(`${Config.BASE_URL}/journals/${userData.journal}/${userData.section}/${userData.subSection ? userData.subSection : ''}`), config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            promptsData: response.data.success.data,
                            type: 'GET_PROMPTS_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        promptsData: null,
                        type: 'GET_PROMPTS_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
