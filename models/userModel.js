const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "sub-admin" , "HR" , "trainer" , "student"],
  },
  client: { type: mongoose.Schema.ObjectId, ref: "client" },
});

const User = mongoose.model("users",userSchema)
module.exports = User