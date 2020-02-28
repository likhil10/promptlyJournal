export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SAVE_PROMPT': {
        return {
            ...state,
            fetching: true,
            savePromptData: undefined,
            error: undefined
        };
    }

    case 'SAVE_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            savePromptData: action.savePromptData,
        };
    }

    case 'SAVE_PROMPT_ERROR': {
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
