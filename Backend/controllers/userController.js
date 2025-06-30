const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretkey = "krishna";

exports.createUsers = async (req, res) => {
 
  const c_id = req.client._id;
 
  try {
    const { name, email, password, role} = req.body;
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return res.status(400).send("user already created");
    }
    const data = { name, email, password, role, client:c_id };
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
    console.log(req.client,"client")
    const c_id = req.client._id
    console.log(c_id,"cid")
    const result = await User.find({ client: c_id }).populate({
      path: "client",
      populate: {
        path: "superAdmin_id",
      },
    });
  return res.status(200).send(result);
};
exports.getAllUsers = async (req, res) => {
    // console.log(req.client)
    // const c_id = req.client_id
 const result = await User.find().populate({
      path: "client",
      populate: {
        path: "superAdmin_id",
      },
    });;
  return res.status(200).send(result);
};

exports.userLogin = async(req,res)=>{
    const {email,password} = req.body
    const alreadyEmail = await User.findOne({email})
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
