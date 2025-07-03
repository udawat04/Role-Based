const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName:{type:String},
    user:{type:mongoose.Schema.ObjectId , ref:"users"},
    client:{type:mongoose.Schema.ObjectId , ref:"client"}
})

const Course = mongoose.model("courses",courseSchema)
module.exports = Course