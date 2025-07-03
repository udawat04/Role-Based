const express = require("express")
const { createUsers, getUsers, userLogin, getClientUser, otpGenerate, forget } = require("../controllers/userController")
const auth = require("../middleware/auth");

const router = express.Router()

router.post("/create",auth,createUsers)
router.get("/",auth,getUsers)
router.get("/getclient/:c_id",auth,getClientUser)
router.post("/login",userLogin)
router.post("/otp/:id",auth,otpGenerate)
router.put("/forget",auth,forget)

module.exports = router