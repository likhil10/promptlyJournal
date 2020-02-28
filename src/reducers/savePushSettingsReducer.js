export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SAVE_PUSH_SETTINGS': {
        return {
            ...state,
            fetching: true,
            savePushSettings: undefined,
            error: undefined
        };
    }

    case 'SAVE_PUSH_SETTINGS_SUCCESS': {
        return {
            ...state,
            fetching: false,
            savePushSettings: action.savePushSettings,
        };
    }

    case 'SAVE_PUSH_SETTINGS_ERROR': {
        return {
            ...state,
            fetching: false,
            error: action.error,
        };
    }
    default: {
        return state;
    }
    }
}
