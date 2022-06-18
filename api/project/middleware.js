const validateProjName = (req, res, next) => {
    let {
        project_name
    } = req.body;
    if (typeof project_name !== 'string' ||
        project_name.trim() == '') {
        next({
            status: 400,
            message: "invalid project_name"
        });
        return;
    }
    next();
}

module.exports = {
    validateProjName
}