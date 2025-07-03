
const Batch = require("../models/batchModel")

exports.createBatch = async(req,res)=>{
    const user_id = req.user._id
    const client_id = req.user.client
    const {batchName , course} = req.body

    const alreadyBatch = await Batch.findOne({batchName})
    if(alreadyBatch){
        return res.status(400).send("Batch  is already created")
    }
    const data = {batchName,course,user:user_id,client:client_id}
    const newCourse = new Batch(data)
    await newCourse.save()

    return res.status(200).send(newCourse)
}

exports.getBatch = async(req,res)=>{
    const result = await Batch.find().populate("course").populate("user").populate("client")
    return res.status(200).send(result)
}