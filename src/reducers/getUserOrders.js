export default function reducer(state = {
    fetching: false,
    ordersData: undefined,
}, action) {
    switch (action.type) {
    case 'GET_ORDERS': {
        return {
            ...state,
            fetching: true,
            error: undefined
        };
    }

    case 'GET_ORDERS_SUCCESS': {
        return {
            ...state,
            fetching: false,
            ordersData: action.ordersData,
        };
    }

    case 'GET_ORDERS_ERROR': {
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
