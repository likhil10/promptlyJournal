export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'EDIT_PROMPT_IMAGE': {
        return {
            ...state,
            fetching: true,
            editPromptImageData: undefined,
            error: undefined
        };
    }

    case 'EDIT_PROMPT_IMAGE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            editPromptImageData: action.editPromptImageData,
        };
    }

    case 'EDIT_PROMPT_IMAGE_ERROR': {
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
