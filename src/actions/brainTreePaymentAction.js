import { Platform, AsyncStorage } from 'react-native';
import Axios from 'axios';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function brainTreePaymentAction() {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        AsyncStorage.getItem(Constant.TOKEN).then((token) => {
            const config = {
                headers: {
                    apiKey: Platform.OS === 'ios'
                        ? Config.IOS_API_KEY
                        : Config.ANDROID_API_KEY,
                    token,
                    'Cache-Control': 'no-cache',
                }
            };
            dispatch({
                error: null,
                braintreePaymentData: null,
                type: 'FETCH_BRAINTREE_PAYMENT'
            });
            Axios.get(`${Config.BASE_URL}/subscriptionplans/clienttoken`, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            braintreePaymentData: response.data.token,
                            type: 'FETCH_BRAINTREE_PAYMENT_SUCCESS'
                        });
                    }
                    resolve(response.data.token);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        braintreePaymentData: null,
                        type: 'FETCH_BRAINTREE_PAYMENT_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
