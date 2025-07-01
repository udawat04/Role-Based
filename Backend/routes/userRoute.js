const express = require("express")
const { createUsers, getUsers, userLogin, getClientUser } = require("../controllers/userController")
const auth = require("../middleware/auth");

const router = express.Router()

router.post("/create",auth,createUsers)
router.get("/",auth,getUsers)
router.get("/getclient/:c_id",auth,getClientUser)
router.post("/login",userLogin)

module.exports = router