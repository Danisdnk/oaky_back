const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VaccinesSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    applicationDate: {
        type: String,
        required: true
    },
    applicationPlace: {
        type: String,
        required: true
    },
    tags: { //dosis
        type: Array,
        default: []
    },

    child_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }

});
module.exports = mongoose.model('Vaccines', VaccinesSchema);