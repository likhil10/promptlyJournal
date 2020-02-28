export default function reducer(state = {
    isConnected: false
}, action) {
    switch (action.type) {
    case 'IS_CONNECTED': {
        return {
            ...state,
            isConnected: action.isConnected,
        };
    }
    default: {
        return state;
    }
    }
}
