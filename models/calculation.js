const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const calculationSchema = new Schema({
    equation : {type:String,required:true}
})


module.exports = mongoose.model("Calculation",calculationSchema);