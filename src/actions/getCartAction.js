import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function getCartAction() {
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
                cartData: null,
                type: 'GET_CART'
            });
            Axios.get(`${Config.BASE_URL}/carts`, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            cartData: response.data.success.data,
                            type: 'GET_CART_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        cartData: null,
                        type: 'GET_CART_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
