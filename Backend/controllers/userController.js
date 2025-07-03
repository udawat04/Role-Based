const { uploadImage, sendMail } = require("../helper");
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

exports.otpGenerate = async(req,res)=>{
  const {id} = req.params
  const user = req.user
  console.log(">>>>>>>>>>>>>.",user)
  const alreadyUser = await User.findById(id)
  console.log("?????????????",alreadyUser)
  const genOtp = (length) => {
    const otp = Math.floor(Math.random(length) * Math.pow(10, length));
    return otp;
  };

  const newOtp = genOtp(4); // function is called
  console.log(newOtp);

  const data = {otp:newOtp}

  const result = await User.findByIdAndUpdate(id,data,{new:true})

  const subject = `Otp Alert  ⚠️⚠️`;
  const text = `Hello  ${alreadyUser.name}, your otp for change password is `;
  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 10px;">
      <h2 style="color: #333;">🔐 OTP Verification</h2>
      <p>Hi <strong>${alreadyUser.name}</strong>,</p>
      <p>You requested to change your password. Please use the following OTP to proceed:</p>
      <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; background-color: #efefef; padding: 10px; text-align: center; border-radius: 5px;">
        ${newOtp}
      </div>
      <p>This OTP is valid for only 10 minutes. Do not share this code with anyone.</p>
      <p>If you did not request this, please ignore this email or contact support.</p>
      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #999;">This is an automated email, please do not reply.</p>
    </div>
  </div>
`;
  await sendMail(alreadyUser.email, subject, text, html);
  return res.status(200).send(result)


}

exports.forget = async(req,res)=>{
  const {email ,newPassword,confirmPassword,otp} = req.body
  const alreadyEmail = await User.findOne({email})
  if(!alreadyEmail){
    return res.status(400).send("User Not exist")
  }
  if(newPassword!==confirmPassword){
    return res.status(400).send("both password not match")
  }
  
  if(otp!==alreadyEmail.otp){
    return res.status(400).send("otp is not matched")
  }
  const id = alreadyEmail._id

  const result = await User.findByIdAndUpdate(id,  {
    password: newPassword,
    $unset: { otp: "" }, 
  }
,{new:true})
 

  return res.status(200).send(result)

}