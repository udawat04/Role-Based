const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  image:{type:String},
  role: {
    type: String,
    enum: ["superAdmin" ,"client", "admin", "sub-admin" , "HR" , "trainer" , "student"],
  },
  superAdmin_id: { type: mongoose.Schema.ObjectId, ref: "super-admin" },
  client: { type: mongoose.Schema.ObjectId, ref: "client" },
});

const User = mongoose.model("users",userSchema)
module.exports = User