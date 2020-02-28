export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'PROMPT_IMAGE_UPDATE': {
        return {
            ...state,
            fetching: true,
            promptImageUpdateData: undefined,
            error: undefined
        };
    }

    case 'PROMPT_IMAGE_UPDATE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            promptImageUpdateData: action.promptImageUpdateData,
        };
    }

    case 'PROMPT_IMAGE_UPDATE_ERROR': {
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
