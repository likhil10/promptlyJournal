export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'FETCH_PROFILE_INFO': {
        return {
            ...state,
            fetching: true,
            fetchProfileInfo: undefined,
            error: undefined
        };
    }

    case 'FETCH_PROFILE_INFO_SUCCESS': {
        return {
            ...state,
            fetching: false,
            fetchProfileInfo: action.fetchProfileInfo,
        };
    }

    case 'FETCH_PROFILE_INFO_ERROR': {
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
