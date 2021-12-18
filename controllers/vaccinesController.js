const { response } = require("express");
const mongoose = require('mongoose')
const Vaccines = require("../models/Vaccines");
const Usuario = require("../models/Usuario");


const createAppliedVaccine = async (req, res = response) => {

    let vaccines = new Vaccines(req.body);

    await vaccines.save();

    res.status(200).json({
        ok: true,
        msg: "vaccine created",
        data: req.body,
    });
};

const findVaccinesChild = async (req, res = response) => {

    let vaccines = await Vaccines.find({ child_id: req.params.id })
    console.log(req.params.id)
    try {
        res.status(200).json({
            ok: true,
            data: vaccines,
            //   id: _id
        });

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "no se encontraron vacunas",
            // data: error

        });
    }

};


const updateVaccine = async (req, res = response) => {

    Vaccines.findOneAndUpdate(({ _id: req.params.id }), { $set: req.body }, (err, doc) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                msg: err,
              
            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: "actualizo bien vacuna"
            });
        }
    });

}

const deleteVaccine = async (req, res = response) => {

    try {
        var deleted = await Vaccines.remove({ _id: req.params.id})

        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        
        return res.status(200).json({
                        ok: true,
                        msg: " se elimino la vacuna seleccionado",
                    });

    } catch (e) {
        throw Error("Error Occured while Deleting the control")
    }

};

module.exports = {
    createAppliedVaccine,
    findVaccinesChild,
    updateVaccine,
    deleteVaccine
}