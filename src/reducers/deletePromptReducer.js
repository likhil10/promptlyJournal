export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'DELETE_PROMPT': {
        return {
            ...state,
            fetching: true,
            deletePromptData: undefined,
            error: undefined
        };
    }

    case 'DELETE_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            deletePromptData: action.deletePromptData,
        };
    }

    case 'DELETE_PROMPT_ERROR': {
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
