
export function togglePromptFlag(status) {
    return (dispatch) => new Promise(() => {
        dispatch({
            type: 'TOGGLE_PROMPT',
            promptFlag: status,
        });
    });
}
