export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'FETCH_PROFILE': {
        return {
            ...state,
            fetching: true,
            profileData: undefined,
            error: undefined
        };
    }

    case 'FETCH_PROFILE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            profileData: action.profileData,
        };
    }

    case 'FETCH_PROFILE_ERROR': {
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
