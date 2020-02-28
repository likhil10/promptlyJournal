import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';
import createStore from './createStore';

const store = createStore();

// eslint-disable-next-line react/prefer-stateless-function
export default class App extends PureComponent {
    /**
     *
     * Method contains Provider to provide data to all the components.
     */
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
