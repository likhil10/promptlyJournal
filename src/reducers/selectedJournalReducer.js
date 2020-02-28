export default function reducer(state = {
    journalSelected: {}
}, action) {
    switch (action.type) {
    case 'JOURNAL_SELECTED': {
        return {
            // ...state,
            journalSelected: action.journalSelected,
        };
    }
    default: {
        return state;
    }
    }
}
