const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PercentilSchema = new Schema({

    year: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    child_related: {
        type: mongoose.Types.ObjectId,
    }

});
module.exports = mongoose.model('Percentil', PercentilSchema);