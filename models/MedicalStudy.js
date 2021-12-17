const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//pediatric control for children 
const medicalStudySchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true,
    },
    result: {
        type: String,
        default:"",
    },
    
});
module.exports = mongoose.model('medicalStudy', medicalStudySchema);