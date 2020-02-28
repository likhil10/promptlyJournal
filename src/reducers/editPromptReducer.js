export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'EDIT_PROMPT': {
        return {
            ...state,
            fetching: true,
            editPromptData: undefined,
            error: undefined
        };
    }

    case 'EDIT_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            editPromptData: action.editPromptData,
        };
    }

    case 'EDIT_PROMPT_ERROR': {
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
