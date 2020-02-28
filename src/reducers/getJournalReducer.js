export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'GET_JOURNAL': {
        return {
            ...state,
            fetching: true,
            journalData: undefined,
            error: undefined
        };
    }

    case 'GET_JOURNAL_SUCCESS': {
        return {
            ...state,
            fetching: false,
            journalData: action.journalData,
        };
    }

    case 'GET_JOURNAL_ERROR': {
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
