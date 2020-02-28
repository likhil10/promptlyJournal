export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'REFERRAL_LINK': {
        return {
            ...state,
            fetching: true,
            loginData: undefined,
            error: undefined
        };
    }

    case 'REFERRAL_LINK_SUCCESS': {
        return {
            ...state,
            fetching: false,
            loginData: action.loginData,
        };
    }

    case 'REFERRAL_LINK_ERROR': {
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
