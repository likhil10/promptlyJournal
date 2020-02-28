import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function fetchProfileDetails() {
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
                fetchProfileInfo: null,
                type: 'FETCH_PROFILE_INFO'
            });
            Axios.get(`${Config.BASE_URL}/users/setting`, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            fetchProfileInfo: response.data.success.data,
                            type: 'FETCH_PROFILE_INFO_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        fetchProfileInfo: null,
                        type: 'FETCH_PROFILE_INFO_ERROR'
                    });
                    reject(msg);
                });
        // fetch(`${Config.BASE_URL}/users/setting`, {
        //     method: 'GET',
        //     config,
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        // dispatch({
        //     type: 'FETCH_PROFILE_INFO_SUCCESS'
        // });
        //         console.error(responseJson);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
        // fetch(`${Config.BASE_URL}/users/setting`, {
        //     method: 'GET',
        //     config,
        // mode: 'cors',
        // })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         dispatch({
        //             type: 'FETCH_PROFILE_INFO_SUCCESS'
        //         });
        //     })
        //     .catch((error) => {
        //         dispatch({
        //             type: 'FETCH_PROFILE_INFO_SUCCESS'
        //         });
        //     });
        });
    });
}
