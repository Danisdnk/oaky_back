const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//pediatric control for children 
const ControlSchema = new Schema({

    date: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    //metricas
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    headDiameter: {
        type: Number,
        required: true
    },
    //tipo de control
    controlType: { //medicalStudys
        type: String,
        default: ""
    },
    medicalStudy: { //medicalStudys
        type: String,
        default: ""
    },
    result: { //medicalStudys
        type: String,
        default: ""
    },
    //medicamentos
    medicine: {
        type: String,
    },
    medicine_comment: {
        type: String,
        required: true
    },

    child_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }

});
module.exports = mongoose.model('Control', ControlSchema);