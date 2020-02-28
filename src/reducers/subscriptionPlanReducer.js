export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'FETCH_SUBSCRIPTION_PLAN': {
        return {
            ...state,
            fetching: true,
            subscriptionPlanData: undefined,
            error: undefined
        };
    }

    case 'FETCH_SUBSCRIPTION_PLAN_SUCCESS': {
        return {
            ...state,
            fetching: false,
            subscriptionPlanData: action.subscriptionPlanData,
        };
    }

    case 'FETCH_SUBSCRIPTION_PLAN_ERROR': {
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
