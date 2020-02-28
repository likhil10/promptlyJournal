export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'GET_PROMPTS_NOTIFICATION': {
        return {
            ...state,
            fetching: true,
            promptData: undefined,
            error: undefined
        };
    }

    case 'GET_PROMPTS_NOTIFICATION_SUCCESS': {
        return {
            ...state,
            fetching: false,
            promptData: action.promptData,
        };
    }

    case 'GET_PROMPTS_NOTIFICATION_ERROR': {
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
