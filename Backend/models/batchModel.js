const mongoose = require("mongoose")

const batchSchema = new mongoose.Schema({
    batchName:{type:String},
    user:{type:mongoose.Schema.ObjectId , ref:"users"},
    client:{type:mongoose.Schema.ObjectId , ref:"client"},
    course:{type:mongoose.Schema.ObjectId , ref:"courses"}
})

const Batch = mongoose.model("batches",batchSchema)
module.exports = Batch