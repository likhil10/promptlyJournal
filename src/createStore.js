import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import combineReducers from './reducers';
import { middlewareNavigator } from './navigators/Root';

const middleware = [thunkMiddleware];

/**
 * Method is used to provide middleware for the asynchronous call.
 * @returns {Store<S>}
 */
export default function store() {
    return createStore(
        combineReducers,
        applyMiddleware(...middleware, middlewareNavigator)
    );
}
