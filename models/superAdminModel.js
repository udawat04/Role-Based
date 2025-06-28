 const mongoose = require("mongoose")

const superAdminSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
 
});

const SuperAdmin = mongoose.model("super-admin",superAdminSchema)
module.exports = SuperAdmin