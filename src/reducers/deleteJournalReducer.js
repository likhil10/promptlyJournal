export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'DELETE_JOURNAL': {
        return {
            ...state,
            fetching: true,
            deleteJournalData: undefined,
            error: undefined
        };
    }

    case 'DELETE_JOURNAL_SUCCESS': {
        return {
            ...state,
            fetching: false,
            deleteJournalData: action.deleteJournalData,
        };
    }

    case 'DELETE_JOURNAL_ERROR': {
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
