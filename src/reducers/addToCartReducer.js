export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'ADD_TO_CART': {
        return {
            ...state,
            fetching: true,
            addCardData: undefined,
            error: undefined
        };
    }

    case 'ADD_TO_CART_SUCCESS': {
        return {
            ...state,
            fetching: false,
            addCardData: action.addCardData,
        };
    }

    case 'ADD_TO_CART_ERROR': {
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
