const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cellphone: {
        type: Number,
        required: true
    },
    documentIdentity: {
        type: Number,
        required: true,
        unique: true
    },
    children: {
        type: Array,
        default: []
    }

});
module.exports = mongoose.model('Usuario', UsuarioSchema);