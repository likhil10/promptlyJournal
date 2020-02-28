import { AsyncStorage } from 'react-native';

export function tabBarOnPressDashboard() {
    return (dispatch) => {
        AsyncStorage.getItem('IS_JOURNAL_SELECTED').then((token) => {
            if (token === 'false') {
                dispatch({
                    isJournalScreenButtonEnabled: false,
                    type: 'IS_JOURNAL_SCREEN_BUTTON_ENABLE'
                });
            }
        });
    };
}
