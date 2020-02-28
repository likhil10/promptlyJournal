export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CHANGE_PASSWORD': {
        return {
            ...state,
            fetching: true,
            changePasswordData: undefined,
            error: undefined
        };
    }

    case 'CHANGE_PASSWORD_SUCCESS': {
        return {
            ...state,
            fetching: false,
            changePasswordData: action.changePasswordData,
        };
    }

    case 'CHANGE_PASSWORD_ERROR': {
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
