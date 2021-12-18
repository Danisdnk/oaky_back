const { response } = require("express");
const mongoose = require('mongoose')
const Children = require("../models/Children");

const createChild = async (req, res = response) => {

    let children = new Children(req.body);

    await children.save();

    res.status(200).json({
        ok: true,
        msg: "child created",
        data: req.body
    });
};

const findChild = async (req, res = response) => {

    let hijo = await Children.find({ parent_id: req.params.id })
    try {
        res.status(200).json({
            ok: true,
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


const updateChild = async (req, res = response) => {

    try {
        const child = await Children.findById(req.params.id);
        Object.assign(child, req.body);
        child.save();
        res.status(200).json({
            ok: true,
            msg: "Child updated",
            data: req.body
        });
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: "fail update child",
            data: req.body
        });
    }

}

const deleteChild = async (req, res = response) => {

    try {
        var deleted = await Children.remove({ _id: req.params.id })


        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }

        return res.status(200).json({
            ok: false,
            msg: " se pudo eliminar :)",
        });

    } catch (e) {
        throw Error("Error Occured while Deleting the child")
    }

};

module.exports = {
    createChild,
    updateChild,
    findChild,
    deleteChild
}