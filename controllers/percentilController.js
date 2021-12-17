const { response } = require("express");
const Percentiles = require("../models/Percentiles");

const crearPercentil = async (req, res = response) => {

    let percentiles = new Percentiles(req.body);
    await percentiles.save();

    res.status(200).json({
        ok: true,
        msg: "register",
        data: req.body
    });

};
//busca si el padre tiene hijos/as y los devuelve
const editarPercentil = async (req, res = response) => {

    Percentiles.findOneAndUpdate(({ _id: req.params.id }), { $set: req.body },
      
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
                    msg: "percentil updated",
                    data: doc
                });
            }
        });

};
const deletePercentil = async (req, res = response) => {
 
    Percentiles.findOneAndDelete(({ _id: req.params.id }), (err, doc) => {
            if (err) {
                res.status(404).json({
                    ok: false,
                    msg: err,
                    data: req.body
                });
            } else {
           
                res.status(200).json({
                    ok: true,
                    msg: "percentil deleted",
                    data: doc
                });
            }
        });

};


module.exports = {
    crearPercentil,
    editarPercentil,
    deletePercentil
}