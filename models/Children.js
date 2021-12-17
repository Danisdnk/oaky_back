const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildrenSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    bornDate: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    allergies: {
        type: Array,
        required: true
    },
    diseases: {
        type: Array,
        default: []
    },
    pediatricControl: { //related to control schema
        type: Array,
        default: []
    },
    parent_id: {
        type: mongoose.Types.ObjectId,
    }

});
module.exports = mongoose.model('Children', ChildrenSchema);