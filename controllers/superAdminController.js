const  SuperAdmin = require("../models/superAdminModel")
const jwt = require("jsonwebtoken")
const secretkey = "hdfdjkdj";

exports.createSuperAdmin = async(req,res)=>{
   try {
    console.log(req.body,":::")
    const { name, email, password } = req.body;
    const alreadyEmail = await SuperAdmin.findOne({email});
    if (alreadyEmail) {
      return res.status(400).send("SuperAdmin already created");
    }

    const data = req.body;
    const newAdmin = new SuperAdmin(data);
    await newAdmin.save();

    return res.status(200).json({ msg: "SuperAdmin is created", newAdmin });
   } 
   
   catch (error) {
    return res.status(500).json({error:error.message})
   }
}

exports.getSuperAdmin = async(req,res)=>{
    const result = await SuperAdmin.find()
    return res.status(200).send(result)
}
exports.superLogin = async(req,res)=>{
    const {email,password} = req.body
    const alreadyEmail = await SuperAdmin.findOne({email})
    if(!alreadyEmail){
        return res.status(400).send("email not found")
    }

    const dbpassword = alreadyEmail.password

    if(password!==dbpassword){
        return res.status(400).send("password not match")
    }

    const token = jwt.sign({email:alreadyEmail.email},secretkey,{expiresIn:"4h"})

    return res.status(200).json({msg:"user logged in ",token})
}