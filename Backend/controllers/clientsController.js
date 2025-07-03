const { uploadImage } = require("../helper");
const Client = require("../models/clientsModel")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const secretkey = "radheradhe";

exports.createClient = async(req,res)=>{
  const s_id = req.user.superAdmin_id
  
  
   try {
    const { name, email, password } = req.body;
    const alreadyEmail = await Client.findOne({email});
    if (alreadyEmail) {
      return res.status(400).send("client already created");
    }
    const imageUpload = await uploadImage(req.files)
    const data = {
      name,
      email,
      password,
      image: imageUpload[0].url,
      superAdmin_id: s_id,
    };
    const newClient = new Client(data);
    const newData = await newClient.save();

    const clientData = {
      name,
      email,
      password,
      image: imageUpload[0].url,
      client: newData._id,
      superAdmin_id: s_id,
      role: "client",
    };

    const newUser = new User(clientData)
    await newUser.save()

    return res
      .status(200)
      .json({ msg: "Client Created Successfully",newClient,newUser });
   } 
   catch (error) {
    return res.status(500).json({ error: error.message });
   }
}

exports.getClients = async(req,res)=>{
  const users = req.user;
  const s_id = req.user. superAdmin_id
  console.log(users,"User");
  const {role} = req.user
  if(role==="superAdmin" )
  {
    const result = await Client.find({ superAdmin_id :s_id}).populate("superAdmin_id");
    console.log(`>>>>>result`, result);
    let id = "";
    let allStaff = []
    for (const item of result) {
      id = item._id;
      console.log("Client ID:", id);
      const Staff = await User.find({ client: id });
      
      allStaff.push(Staff)

    }
    
    



    // const data = await User.find();
    // console.log(`>>>>>data`,data);
    
    const abc = { result,allStaff};
    return res.status(200).send(abc);
  }
  else{
    return res.status(400).send("you are not authorized");
  }
    
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

    return res.status(200).json({msg:"Client logged in ",token})
}