function styleSwitcher(req, res, next) {

    const styleSwitcher = req.session.styleSwitcher || {style: 'style'};
    const {style} = req.query;

    if(style) {
        styleSwitcher.style = style;
    }

    req.styleSwitcher = req.session.styleSwitcher = styleSwitcher;
    next();
}

export default styleSwitcher;