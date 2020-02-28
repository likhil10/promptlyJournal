import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import Constants from '../utility/constants';

export function authorizationAction() {
    return (dispatch) => new Promise(() => {
        AsyncStorage.getItem(Constants.TOKEN)
            .then(token => {
                if (token) {
                    const reset = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: 'SecureLoginScreen' })
                        ]
                    });
                    dispatch(reset);
                } else {
                    const reset = StackActions.reset({
                        index: 0,
                        key: null,
                        actions: [
                            NavigationActions.navigate({ routeName: 'LoginScreen' })
                        ]
                    });
                    dispatch(reset);
                }
            });
    });
}
