export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'FETCH_UNSUBSCRIBE_DATA': {
        return {
            ...state,
            fetching: true,
            unsubscribePlanData: undefined,
            error: undefined
        };
    }

    case 'FETCH_UNSUBSCRIBE_DATA_SUCCESS': {
        return {
            ...state,
            fetching: false,
            unsubscribePlanData: action.unsubscribePlanData,
        };
    }

    case 'FETCH_UNSUBSCRIBE_DATA_ERROR': {
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
