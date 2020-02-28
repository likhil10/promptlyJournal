export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'GENERATE_CODE': {
        return {
            ...state,
            fetching: true,
            generateCodeData: undefined,
            error: undefined
        };
    }

    case 'GENERATE_CODE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            generateCodeData: action.generateCodeData,
        };
    }

    case 'GENERATE_CODE_ERROR': {
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
