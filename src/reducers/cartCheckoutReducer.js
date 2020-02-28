export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'CART_CHECKOUT': {
        return {
            ...state,
            fetching: true,
            checkoutData: undefined,
            error: undefined
        };
    }

    case 'CART_CHECKOUT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            checkoutData: action.checkoutData,
        };
    }

    case 'CART_CHECKOUT_ERROR': {
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
