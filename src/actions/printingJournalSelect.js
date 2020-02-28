import Axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { fetchErrorMessage } from '../utility/helperComponent';
import Constant from '../utility/constants';
import Config from '../utility/config';


export function printingJournalSelect(data) {
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
                printingJournalSelectData: null,
                type: 'PRINTING_JOURNAL_SELECT'
            });
            Axios.post(`${Config.BASE_URL}/journals/select`, data, config)
                .then((response) => {
                    if (response.status === Constant.HTTP_SUCCESS_CODE) {
                        dispatch({
                            error: null,
                            printingJournalSelectData: response.data.success.data.data,
                            type: 'PRINTING_JOURNAL_SELECT_SUCCESS'
                        });
                    }
                    resolve(response.data.success.data.data);
                })
                .catch((error) => {
                    const msg = fetchErrorMessage(error);
                    dispatch({
                        error: msg,
                        printingJournalSelectData: null,
                        type: 'PRINTING_JOURNAL_SELECT_ERROR'
                    });
                    reject(msg);
                });
        });
    });
}
