import Axios from 'axios';
import {
    AsyncStorage,
    Platform
} from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function referralAction() {
    return (dispatch) => new Promise((resolve, reject) => {
        AsyncStorage.getItem(Constant.TOKEN)
            .then((token) => {
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
                    referralData: null,
                    type: 'REFERRAL_LINK'
                });
                Axios.get(`${Config.BASE_URL}/users/referral/link`, config)
                    .then((response) => {
                        if (response.status === Constant.HTTP_SUCCESS_CODE) {
                            dispatch({
                                error: null,
                                referralData: response.data.success.data,
                                type: 'REFERRAL_LINK_SUCCESS'
                            });
                        }
                        resolve(response.data.success.data);
                    })
                    .catch((error) => {
                        const msg = fetchErrorMessage(error);
                        dispatch({
                            error: msg,
                            referralData: null,
                            type: 'REFERRAL_LINK_ERROR'
                        });
                        reject(msg);
                    });
            });
    });
}
