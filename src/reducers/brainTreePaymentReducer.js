export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'FETCH_BRAINTREE_PAYMENT': {
        return {
            ...state,
            fetching: true,
            braintreePaymentData: undefined,
            error: undefined
        };
    }

    case 'FETCH_BRAINTREE_PAYMENT_SUCCESS': {
        return {
            ...state,
            fetching: false,
            braintreePaymentData: action.braintreePaymentData,
        };
    }

    case 'FETCH_BRAINTREE_PAYMENT_ERROR': {
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
