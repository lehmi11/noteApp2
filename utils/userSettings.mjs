
function sessionUserSettings(req, res, next) {
        const userSettings = req.session.mySettings || {
        sortBy: 'id',
        orderDirection: 1,
        showOnlyDoneNotes: false};
    const {sortBy, orderDirection, showOnlyDoneNotes} = req.query;

    if (sortBy) {
        userSettings.sortBy = sortBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }

    if (showOnlyDoneNotes) {
        userSettings.showOnlyDoneNotes = showOnlyDoneNotes;
    }

    req.mySettings = req.session.mySettings = userSettings;

    next();
}


export default sessionUserSettings;