export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'DUPLICATE_PROMPT': {
        return {
            ...state,
            fetching: true,
            duplicatePromptData: undefined,
            error: undefined
        };
    }

    case 'DUPLICATE_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            duplicatePromptData: action.duplicatePromptData,
        };
    }

    case 'DUPLICATE_PROMPT_ERROR': {
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
