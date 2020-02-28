export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'PRINTING_JOURNAL_SELECT': {
        return {
            ...state,
            fetching: true,
            printingJournalSelectData: undefined,
            error: undefined
        };
    }

    case 'PRINTING_JOURNAL_SELECT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            printingJournalSelectData: action.printingJournalSelectData,
        };
    }

    case 'PRINTING_JOURNAL_SELECT_ERROR': {
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
