import Axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function savePurchaseDetails(userData) {
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
                savePurchaseDetailsData: null,
                type: 'SAVE_PURCHASE_DETAILS'
            });
            Axios.post(`${Config.BASE_URL}/subscriptionplans/purchase`, userData, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            savePurchaseDetailsData: response.data.success.data,
                            type: 'SAVE_PURCHASE_DETAILS_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        savePurchaseDetailsData: null,
                        type: 'SAVE_PURCHASE_DETAILS_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
