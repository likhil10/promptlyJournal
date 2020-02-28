export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'PROMPT_IMAGE_UPLOAD': {
        return {
            ...state,
            fetching: true,
            promptImageData: undefined,
            error: undefined
        };
    }

    case 'PROMPT_IMAGE_UPLOAD_SUCCESS': {
        return {
            ...state,
            fetching: false,
            promptImageData: action.promptImageData,
        };
    }

    case 'PROMPT_IMAGE_UPLOAD_ERROR': {
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
