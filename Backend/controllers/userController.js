const { uploadImage } = require("../helper");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretkey = "radheradhe";

exports.createUsers = async (req, res) => {
 
  const c_id = req.user.client;
 
  try {
    const { name, email, password, role} = req.body;
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return res.status(400).send("user already created");
    }
    const imageUpload = await uploadImage(req.files)
    const data = { name, email, password,image:imageUpload[0].url, role, client:c_id };
    const newUser = new User(data);
    await newUser.save();

    return res
      .status(200)
      .json({ msg: "User Created Successfully", newUser});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
   const {role} = req.user
   const c_id = req.user.client
   const s_id = req.user.superAdmin_id;
   console.log(c_id,s_id,"KKK")
   if(role==="superAdmin"){
    const result = await User.find().populate("superAdmin_id").populate("client");
   
    return res.status(200).send(result);
   }
   else if(role==="client" ||role==="admin" ||role==="HR" ||role==="sub-admin" ||role==="trainer" ){
    const result = await User.find({ client: c_id })
      .populate("superAdmin_id")
      .populate("client");
    return res.status(200).send(result);
   }
 
    
};
exports.getClientUser = async (req, res) => {
  const { role } = req.user;
  const {c_id} = req.params
  if (role === "superAdmin") {
    const result = await User.find({ client: c_id })
      .populate("superAdmin_id")
      .populate("client");
    return res.status(200).send(result);
  }
};

exports.userLogin = async(req,res)=>{
    const {email,password} = req.body
    const alreadyEmail = await User.findOne({ email })
      .populate("superAdmin_id")
      .populate("client");
    if(!alreadyEmail){
        return res.status(400).send("email not found")
    }

    const dbpassword = alreadyEmail.password

    if(password!==dbpassword){
        return res.status(400).send("password not match")
    }

    const token = jwt.sign({email:alreadyEmail.email},secretkey,{expiresIn:"4h"})

    return res.status(200).json({msg:"user logged in ",token,user:alreadyEmail})
}
