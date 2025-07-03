const  SuperAdmin = require("../models/superAdminModel")
const jwt = require("jsonwebtoken")
const secretkey = "radheradhe";
const User = require("../models/userModel");
const { uploadImage } = require("../helper");

exports.createSuperAdmin = async(req,res)=>{
   try {
    console.log(req.body,":::")
    const { name, email, password } = req.body;
    const alreadyEmail = await SuperAdmin.findOne({email});
    if (alreadyEmail) {
      return res.status(400).send("SuperAdmin already created");
    }

    const imageUpload = await uploadImage(req.files)

    const data = {name,email,password,image:imageUpload[0].url};
    const newAdmin = new SuperAdmin(data);
    const newData = await newAdmin.save();

    console.log(newData._id,"newdata")
   const userData = { name, email, password,image:imageUpload[0].url, superAdmin_id:newData._id , role:"superAdmin" };

   console.log(userData,"userrr")
   
   const newUser = new User(userData)
    await newUser.save()

    return res.status(200).json({ msg: "SuperAdmin is created", newAdmin ,newUser });
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

    return res.status(200).json({msg:"Super-Admin logged in ",token})
}