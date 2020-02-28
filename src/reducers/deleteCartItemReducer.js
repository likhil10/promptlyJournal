export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'DELETE_CART_ITEM': {
        return {
            ...state,
            fetching: true,
            deleteCartItemData: undefined,
            error: undefined
        };
    }

    case 'DELETE_CART_ITEM_SUCCESS': {
        return {
            ...state,
            fetching: false,
            deleteCartItemData: action.deleteCartItemData,
        };
    }

    case 'DELETE_CART_ITEM_ERROR': {
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
