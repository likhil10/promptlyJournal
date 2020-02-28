export default function reducer(state = {
    isJournalScreenButtonEnabled: true
}, action) {
    switch (action.type) {
    case 'IS_JOURNAL_SCREEN_BUTTON_ENABLE': {
        return {
            ...state,
            isJournalScreenButtonEnabled: action.isJournalScreenButtonEnabled,
        };
    }
    default: {
        return state;
        // Need to set the default state.
    }
    }
}
