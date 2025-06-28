const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
  className: { type: String },
  trainerName: { type: String },
  user_id: { type: mongoose.Schema.ObjectId, ref: "users" },
  client_id: { type: mongoose.Schema.ObjectId, ref: "client" },
});

const Class = mongoose.model("classes",classSchema)
module.exports = Class