export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SECURE_LOGIN': {
        return {
            ...state,
            fetching: true,
            secureLoginData: undefined,
            error: undefined
        };
    }

    case 'SECURE_LOGIN_SUCCESS': {
        return {
            ...state,
            fetching: false,
            secureLoginData: action.secureLoginData,
        };
    }

    case 'SECURE_LOGIN_ERROR': {
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
