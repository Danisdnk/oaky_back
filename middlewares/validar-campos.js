const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }
    next();
}
module.exports = {
    validarCampos
}