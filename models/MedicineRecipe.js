const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//pediatric control for children 
const MedicineRecipeSchema = new Schema({

    medicine: {
        type: String,
    },   
    comment: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model('MedicineRecipe', MedicineRecipeSchema);