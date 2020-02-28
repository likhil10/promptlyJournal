export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'LOG_OUT': {
        return {
            ...state,
            fetching: true,
            logoutData: undefined,
            error: undefined
        };
    }

    case 'LOG_OUT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            logoutData: action.logoutData,
        };
    }

    case 'LOG_OUT_ERROR': {
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
