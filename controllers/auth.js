const { response } = require("express");
const bcrypt = require("bcryptjs");
const Children = require("../models/Children");
var jwt = require('jsonwebtoken');
const Usuario = require("../models/Usuario");
const { sendEmail } = require("../config/nodeMailerReset");

const crearUsuario = async (req, res = response) => {

    let usuario = new Usuario(req.body);

    try {
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(req.body.password, salt);

        var token = jwt.sign({
            id: usuario._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        await usuario.save();

        return res.status(201).json({
            ok: true,
            msg: "login",
            jwt: token,
            data: usuario
        });


    } catch (error) {

        return res.status(404).json({
            ok: false,
            msg: "no se pudo crear el usuario",
            data: error
        });

    }
};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });


    const validPassword = bcrypt.compareSync(password, usuario.password);
    console.log(validPassword)

    if (!validPassword) {

        return res.status(400).json({
            ok: false,
            msg: "revisa tus datos ingresados",

        });
    }

    var token = jwt.sign({ id: usuario._id }, process.env.SECRET, { expiresIn: 86400 });// expires in 24 hours 

    return res.status(200).json({
        ok: true,
        msg: "login",
        jwt: token,
        data: usuario,
    });

}


const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

const userPasswordReset = async (req, res = response) => {

    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });

    try {
        if (usuario) {

            sendEmail(email, usuario.password, usuario._id);
            return res.status(200).json({
                ok: true,
                msg: "se envio un mail para resetear tu contraseña",
                data: email
            });
        }

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: "revisa el codigo ingresado",
        });
    }
};

const userChangePasswordReset = async (req, res = response) => {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    try {
        if (usuario.password === password) {

            return res.status(200).json({
                ok: true,
                msg: "Ingresa tu nuevo pass"
            });
        } else {

            return res.status(400).json({
                ok: false,
                msg: "revisa el codigo ingresado"
            });
        }

    } catch (error) {

        return res.status(400).json({
            ok: false,
            msg: "revisa el codigo ingresado",
        });
    }

};

const updatePassword = async (req, res = response) => {

    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync();
    req.body.password = bcrypt.hashSync(password, salt);

    var newbody = req.body;

    Usuario.findOneAndUpdate({ email: email }, { $set: newbody }, (err, doc) => {

        try {

            if (err) {
                return res.status(404).json({
                    ok: false,
                    msg: err,
                });
            }
            return res.status(200).json({
                ok: true,
                msg: "contraseña actualizada volve a loguear!",
            });

        } catch (error) {

            return res.status(404).json({
                ok: false,
                msg: "no se pudo resetear tu contraseña",
            });
        }
    });

}


//busca si el padre tiene hijos/as y los devuelve
const findParentChild = async (req, res = response) => {

    const hijo = await Children.find({ parent_id: req.params.id })
    try {

        const padre = await Usuario.findById(req.params.id);
        res.status(200).json({
            ok: true,
            msg: "Child updated",
            data: hijo
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "fail update child",
            data: req.body
        });
    }

};

const findParentId = async (req, res = response) => {

    let hijo = await Children.find({ parent_id: req.param.id })
    console.log(hijo)

    try {
        let padre = await Usuario.findOne(req.param.id);

        res.status(200).json({
            ok: true,
            msg: "user data",
            data: padre,
            hijo: hijo
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "no se pudo obtener",
            data: req.body
        });
    }

};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    findParentChild,
    findParentId,
    userPasswordReset,
    userChangePasswordReset,
    updatePassword
}