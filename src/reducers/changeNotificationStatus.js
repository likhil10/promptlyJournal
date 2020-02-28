export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CHANGE_NOTIFICATION_STATUS': {
        return {
            ...state,
            fetching: true,
            changeNotificationData: undefined,
            error: undefined
        };
    }

    case 'CHANGE_NOTIFICATION_STATUS_SUCCESS': {
        return {
            ...state,
            fetching: false,
            changeNotificationData: action.changeNotificationData,
        };
    }

    case 'CHANGE_NOTIFICATION_STATUS_ERROR': {
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
