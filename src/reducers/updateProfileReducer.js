export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'UPDATE_PROFILE': {
        return {
            ...state,
            fetching: true,
            updateProfileData: undefined,
            error: undefined
        };
    }

    case 'UPDATE_PROFILE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            updateProfileData: action.updateProfileData,
        };
    }

    case 'UPDATE_PROFILE_ERROR': {
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
