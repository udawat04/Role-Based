const mongoose = require("mongoose")

const clientsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  superAdmin_id: { type: mongoose.Schema.ObjectId, ref: "super-admin" },
});

const Client = mongoose.model("client",clientsSchema)
module.exports = Client