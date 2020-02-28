export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'RESET_PASSWORD': {
        return {
            ...state,
            fetching: true,
            resetPasswordData: undefined,
            error: undefined
        };
    }

    case 'RESET_PASSWORD_SUCCESS': {
        return {
            ...state,
            fetching: false,
            resetPasswordData: action.resetPasswordData,
        };
    }

    case 'RESET_PASSWORD_ERROR': {
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
