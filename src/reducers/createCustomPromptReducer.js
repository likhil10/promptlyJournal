export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CREATE_CUSTOM_PROMPT': {
        return {
            ...state,
            fetching: true,
            createCustomPromptData: undefined,
            error: undefined
        };
    }

    case 'CREATE_CUSTOM_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            createCustomPromptData: action.createCustomPromptData,
        };
    }

    case 'CREATE_CUSTOM_PROMPT_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }

    default: {
        return state;
    }
    }
}
