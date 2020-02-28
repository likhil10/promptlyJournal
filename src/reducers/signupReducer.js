export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SIGN_UP': {
        return {
            ...state,
            fetching: true,
            signUpData: undefined,
            error: undefined
        };
    }

    case 'SIGN_UP_SUCCESS': {
        return {
            ...state,
            fetching: false,
            signUpData: action.signUpData,
        };
    }

    case 'SIGN_UP_ERROR': {
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
