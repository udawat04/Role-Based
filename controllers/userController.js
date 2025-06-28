const User = require("../models/userModel");

exports.createUsers = async (req, res) => {
  try {
    const { name, email, password, role,client} = req.body;
    const alreadyEmail = await User.findOne({ email });
    if (alreadyEmail) {
      return res.status(400).send("user already created");
    }
    const data = req.body;
    const newUser = new User(data);
    await newUser.save();

    return res
      .status(200)
      .json({ msg: "User Created Successfully", newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const result = await User.find();
  return res.status(200).send(result);
};
