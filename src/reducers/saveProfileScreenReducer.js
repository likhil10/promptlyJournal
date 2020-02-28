export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SAVE_PROFILE': {
        return {
            ...state,
            fetching: true,
            saveProfileData: undefined,
            error: undefined
        };
    }

    case 'SAVE_PROFILE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            saveProfileData: action.saveProfileData,
        };
    }

    case 'SAVE_PROFILE_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }
    default: {
        return state;
    }
    }
}
