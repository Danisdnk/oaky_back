const { response } = require("express");
const Control = require("../models/Control");

const crearControlMedico = async (req, res = response) => {

    let control = new Control(req.body);

    await control.save();

    return res.status(200).json({
        ok: true,
        msg: "register",
        data: req.body
    });

};
//busca si el padre tiene hijos/as y los devuelve
const editarControlMedico = async (req, res = response) => {

    Control.findOneAndUpdate(({ _id: req.params.id }), { $set: req.body },

        (err, doc) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: err,
                    data: req.body
                });
            } else {

                res.status(201).json({
                    ok: true,
                    msg: "Child updated",
                    data: doc
                });
            }
        });

};


const findControlForChild = async (req, res = response) => {

    let controls = await Control.find({ child_id: req.params.id })

    try {
        res.status(200).json({
            ok: true,
            data: controls
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "No se encontraron controles",
            data: req.body
        });
    }

};


const deleteControl = async (req, res = response) => {

    try {
        var deleted = await Control.remove({ _id: req.params.id })


        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }

        return res.status(200).json({
            ok: true,
            msg: " se elimino el control seleccionado",
        });

    } catch (e) {
        throw Error("Error Occured while Deleting the control")
    }

};

const updateControl = async (req, res = response) => {

    Control.findOneAndUpdate(({ _id: req.params.id }), { $set: req.body }, (err, doc) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                msg: err,

            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: "actualizo bien el control"
            });
        }
    });

}

const eliminarControlMedico = async (req, res = response) => {

    Control.findOneAndDelete(({ _id: req.params.id }), (err, doc) => {
        if (err) {
            res.status(404).json({
                ok: false,
                msg: err,
                data: req.body
            });
        } else {

            res.status(200).json({
                ok: true,
                msg: "percentil updated",
                data: doc
            });
        }
    });

};


module.exports = {
    crearControlMedico,
    findControlForChild,
    updateControl,
    deleteControl,
    eliminarControlMedico
}