export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'GET_PROMPTS': {
        return {
            ...state,
            fetching: true,
            promptsData: undefined,
            error: undefined
        };
    }

    case 'GET_PROMPTS_SUCCESS': {
        return {
            ...state,
            fetching: false,
            promptsData: action.promptsData,
        };
    }

    case 'GET_PROMPTS_ERROR': {
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
