export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'MOVE_PROMPT': {
        return {
            ...state,
            fetching: true,
            movePromptData: undefined,
            error: undefined
        };
    }

    case 'MOVE_PROMPT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            movePromptData: action.movePromptData,
        };
    }

    case 'MOVE_PROMPT_ERROR': {
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
