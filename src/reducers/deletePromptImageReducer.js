export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'DELETE_PROMPT_IMAGE': {
        return {
            ...state,
            fetching: true,
            deletePromptImageData: undefined,
            error: undefined
        };
    }

    case 'DELETE_PROMPT_IMAGE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            deletePromptImageData: action.deletePromptImageData,
        };
    }

    case 'DELETE_PROMPT_IMAGE_ERROR': {
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
