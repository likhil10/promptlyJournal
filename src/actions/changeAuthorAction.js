import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function changeAuthorAction(journal_id, prompt_id, body) {
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
                changeAuthorData: null,
                type: 'CHANGE_AUTHOR'
            });
            Axios.put(`${Config.BASE_URL}/journals/prompt/author/${journal_id}/${prompt_id}`, body, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            changeAuthorData: response.data.success.data,
                            type: 'CHANGE_AUTHOR_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        changeAuthorData: null,
                        type: 'CHANGE_AUTHOR_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
