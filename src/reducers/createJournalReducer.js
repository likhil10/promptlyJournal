export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CREATE_JOURNAL': {
        return {
            ...state,
            fetching: true,
            createJournalData: undefined,
            error: undefined
        };
    }

    case 'CREATE_JOURNAL_SUCCESS': {
        return {
            ...state,
            fetching: false,
            createJournalData: action.createJournalData,
        };
    }

    case 'CREATE_JOURNAL_ERROR': {
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
