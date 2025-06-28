const Client = require("../models/clientsModel")
const jwt = require("jsonwebtoken")
const secretkey = "radheradhe";

exports.createClient = async(req,res)=>{
   try {
    const { name, email, password, superAdmin_id } = req.body;
    const alreadyEmail = await Client.findOne({email});
    if (alreadyEmail) {
      return res.status(400).send("client already created");
    }
    const data = req.body;
    const newClient = new Client(data);
    await newClient.save();

    return res
      .status(200)
      .json({ msg: "Clent Created Successfully", newClient });
   } 
   catch (error) {
    return res.status(500).json({ error: error.message });
   }
}

exports.getClients = async(req,res)=>{
  console.log(req.superAdmin,"superAdmin");
    const result = await Client.find()
    return res.status(200).send(result)
}

exports.clientLogin = async(req,res)=>{
    const {email,password} = req.body
    const alreadyEmail = await Client.findOne({email})
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