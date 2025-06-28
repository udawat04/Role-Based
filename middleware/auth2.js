const jwt = require("jsonwebtoken");
const secretkey = "hdfdjkdj";
const Client = require("../models/clientsModel");

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

  const clientDetail = await Client.findOne({ email });

  if (!clientDetail) {
    return res.status(400).send("client not found");
  }

  req.client = clientDetail;
  next();
};
