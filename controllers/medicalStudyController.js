const { response } = require("express");
const MedicalStudy = require("../models/MedicalStudy");

const crearEstudioMedico = async (req, res = response) => {

    let medicalStudies = new MedicalStudy(req.body);
    await medicalStudies.save();

    res.status(200).json({
        ok: true,
        msg: "register",
        data: req.body
    });

};
const editarEstudioMedico = async (req, res = response) => {

    MedicalStudy.findOneAndUpdate(({ _id: req.params.id }), { $set: req.body },  (err, doc) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: err,
                    data: req.body
                });
            } else {

                res.status(201).json({
                    ok: true,
                    msg: "estudio actualizado",
                    data:doc
                });
            }
        });

};
const eliminarEstudioMedico = async (req, res = response) => {

    MedicalStudy.findOneAndDelete(({ _id: req.params.id }), (err, doc) => {
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
                data:"a", //JSON.stringify(padre)
            });
        }
    });

};

module.exports = {
    crearEstudioMedico,
    editarEstudioMedico,
    eliminarEstudioMedico
}