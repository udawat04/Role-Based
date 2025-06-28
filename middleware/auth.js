const jwt = require("jsonwebtoken");
const secretkey = "hdfdjkdj";
const SuperAdmin = require("../models/superAdminModel");

module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log(bearerToken, "bearerToken");

  if (!bearerToken) {
    return res.status(400).send("no token provide");
  }

  const token = bearerToken.split(" ")[1];
  console.log(token, "........");

  const decode = jwt.verify(token, secretkey);
  if (!decode) {
    return res.status(400).send("invalid token");
  }
  console.log(decode.email, "decode");
  const email = decode.email;

  const superAdminDetail = await SuperAdmin.findOne({ email });

  if (!superAdminDetail) {
    return res.status(400).send("superAdmin not found");
  }

  req.superAdmin = superAdminDetail;
  next();
};
