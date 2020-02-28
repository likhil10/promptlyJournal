import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function subscriptionPlanAction(subscriptionData) {
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
                subscriptionPlanData: null,
                type: 'FETCH_SUBSCRIPTION_PLAN'
            });
            Axios.post(`${Config.BASE_URL}/subscriptionplans`, subscriptionData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            subscriptionPlanData: response.data,
                            type: 'FETCH_SUBSCRIPTION_PLAN_SUCCESS'
                        });
                    }
                    resolve(response.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        subscriptionPlanData: null,
                        type: 'FETCH_SUBSCRIPTION_PLAN_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
