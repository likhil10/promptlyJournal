export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'ROTATE_IMAGE': {
        return {
            ...state,
            fetching: true,
            rotateImageData: undefined,
            error: undefined
        };
    }

    case 'ROTATE_IMAGE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            rotateImageData: action.rotateImageData,
        };
    }

    case 'ROTATE_IMAGE_ERROR': {
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
