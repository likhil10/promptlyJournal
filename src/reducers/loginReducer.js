export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'LOG_IN': {
        return {
            ...state,
            fetching: true,
            loginData: undefined,
            error: undefined
        };
    }

    case 'LOG_IN_SUCCESS': {
        return {
            ...state,
            fetching: false,
            loginData: action.loginData,
        };
    }

    case 'LOG_IN_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }

    default: {
        return state;
        // Need to set the default state.
    }
    }
}
