export default function reducer(state = {
    fetching: false,
}, action) {
    switch (action.type) {
    case 'SAVE_PURCHASE_DETAILS': {
        return {
            ...state,
            fetching: true,
            savePurchaseDetailsData: undefined,
            error: undefined
        };
    }

    case 'SAVE_PURCHASE_DETAILS_SUCCESS': {
        return {
            ...state,
            fetching: false,
            savePurchaseDetailsData: action.savePurchaseDetailsData,
        };
    }

    case 'SAVE_PURCHASE_DETAILS_ERROR': {
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
