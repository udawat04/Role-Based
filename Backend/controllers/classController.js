const Class = require("../models/classModel")

exports.createClass = async(req,res)=>{
    const u_id = req.user._id
    const c_id = req.user.client
    const {role} = req.user
    const {className,trainerName,user_id,client_id} = req.body
    if(role==="admin" ||role==="sub-admin" ||role==="HR"){
        const data = { className, trainerName, user_id:u_id, client_id:c_id };
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
exports.getAllClass = async(req,res)=>{
 
    const c_id = req.client._id
    console.log(c_id,"dddddddddd")
    const result = await Class.find({client_id:c_id}).populate("client_id").populate("user_id")
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