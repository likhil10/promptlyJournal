export default function reducer(state = {
    promptFlag: true
}, action) {
    switch (action.type) {
    case 'TOGGLE_PROMPT': {
        return {
            ...state,
            promptFlag: action.promptFlag,
        };
    }

    default: {
        return state;
        // Need to set the default state.
    }
    }
}
