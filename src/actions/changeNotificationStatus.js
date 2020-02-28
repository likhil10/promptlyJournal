import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function changeNotificationStatus(journalId, body) {
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
                changeNotificationData: null,
                type: 'CHANGE_NOTIFICATION_STATUS'
            });
            Axios.put(`${Config.BASE_URL}/journals/notification/status/${journalId}`, body, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            changeNotificationData: response.data.success.data,
                            type: 'CHANGE_NOTIFICATION_STATUS_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        changeNotificationData: null,
                        type: 'CHANGE_NOTIFICATION_STATUS_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
