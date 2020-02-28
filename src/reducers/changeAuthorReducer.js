export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CHANGE_AUTHOR': {
        return {
            ...state,
            fetching: true,
            changeAuthorData: undefined,
            error: undefined
        };
    }

    case 'CHANGE_AUTHOR_SUCCESS': {
        return {
            ...state,
            fetching: false,
            changeAuthorData: action.changeAuthorData,
        };
    }

    case 'CHANGE_AUTHOR_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }

    default: {
        // Need to set the default state.
    }
    }
    return state;
}
