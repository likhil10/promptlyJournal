import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function unsubscribeAction(unsubscribeData) {
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
                unsubscriptionData: null,
                type: 'FETCH_UNSUBSCRIBE_DATA'
            });
            Axios.put(`${Config.BASE_URL}/subscriptionplans/unsubscribe`, unsubscribeData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            unsubscriptionData: response.data,
                            type: 'FETCH_UNSUBSCRIBE_DATA_SUCCESS'
                        });
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        unsubscriptionData: null,
                        type: 'FETCH_UNSUBSCRIBE_DATA_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
