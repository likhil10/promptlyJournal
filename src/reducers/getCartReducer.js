export default function reducer(state = {
    fetching: false,
    cartData: undefined,
}, action) {
    switch (action.type) {
    case 'GET_CART': {
        return {
            ...state,
            fetching: true,
            error: undefined
        };
    }

    case 'GET_CART_SUCCESS': {
        return {
            ...state,
            fetching: false,
            cartData: action.cartData,
        };
    }

    case 'GET_CART_ERROR': {
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
