/**
 *  Action for access the network information.
 */
export function checkNetworkAction(isConnected) {
    return (dispatch) => new Promise((resolve) => {
        dispatch({
            isConnected,
            type: 'IS_CONNECTED'
        });
        resolve(isConnected);
    });
}
