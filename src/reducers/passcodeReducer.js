export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'PASSCODE': {
        return {
            ...state,
            fetching: true,
            loginData: undefined,
            error: undefined
        };
    }

    case 'PASSCODE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            loginData: action.loginData,
        };
    }

    case 'PASSCODE_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }

    default: {
        // Need to set the default state.
    }
    }
    return state;
}
