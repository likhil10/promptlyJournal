/**
 *  Action for access the selected Journal
 */
export function selectedJournalAction(journalSelected) {
    return (dispatch) => new Promise((resolve) => {
        dispatch({
            journalSelected,
            type: 'JOURNAL_SELECTED'
        });
        resolve(journalSelected);
    });
}
