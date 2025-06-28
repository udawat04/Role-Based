const Class = require("../models/classModel")

exports.createClass = async(req,res)=>{
    const {role} = req.user
    const {className,trainerName,user_id,client_id} = req.body
    if(role==="admin" ||role==="sub-admin" ||role==="HR"){
        const data = req.body
        const newClass = new Class(data)
        await newClass.save()
        return res.status(200).json({msg:"class created successfully",newClass})
    }
    else{
        return res.status(400).send("you are not authorized to do this")
    }
}

exports.getClass = async(req,res)=>{
    const {role} = req.user
    const result = await Class.find()
    return res.status(200).send(result)
}

exports.updateClass = async(req,res)=>{
    const {role} = req.user
    const { className, trainerName ,id} = req.body;
    if(role==="admin" ||role==="sub-admin" ||role==="HR" ||role==="trainer"){
        const data = { className, trainerName };
        const result = await Class.findOneAndUpdate(id, data, { new: true });
        return res.status(200).send(result)
    }
    else{
        return res.status(400).send("you are not authorized to do this");
    }
}