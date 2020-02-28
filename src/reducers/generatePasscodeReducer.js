export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'GENERATE_PASSCODE': {
        return {
            ...state,
            fetching: true,
            generatePasscodeData: undefined,
            error: undefined
        };
    }

    case 'GENERATE_PASSCODE_SUCCESS': {
        return {
            ...state,
            fetching: false,
            generatePasscodeData: action.generatePasscodeData,
        };
    }

    case 'GENERATE_PASSCODE_ERROR': {
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
