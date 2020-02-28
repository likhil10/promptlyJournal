export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'UPDATE_SUBSCRIPTION_PLAN': {
        return {
            ...state,
            fetching: true,
            updateSubscription: undefined,
            error: undefined
        };
    }

    case 'UPDATE_SUBSCRIPTION_PLAN_SUCCESS': {
        return {
            ...state,
            fetching: false,
            updateSubscription: action.updateSubscription,
        };
    }

    case 'UPDATE_SUBSCRIPTION_PLAN_ERROR': {
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
