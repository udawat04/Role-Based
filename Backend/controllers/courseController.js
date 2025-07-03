const Course = require("../models/courseModel")

exports.createCourse = async(req,res)=>{
    const user_id = req.user._id
    const client_id = req.user.client
    const {courseName} = req.body

    const alreadyCourse = await Course.findOne({courseName})
    if(alreadyCourse){
        return res.status(400).send("Course is already created")
    }
    const data = {courseName,user:user_id,client:client_id}
    const newCourse = new Course(data)
    await newCourse.save()

    return res.status(200).send(newCourse)
}

exports.getCourses = async(req,res)=>{
    const result = await Course.find().populate("client").populate("user")
    return res.status(200).send(result)
}