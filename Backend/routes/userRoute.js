const express = require("express")
const { createUsers, getUsers, userLogin, getAllUsers } = require("../controllers/userController")
const auth2 = require("../middleware/auth2")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/create",auth2,createUsers)
router.get("/",auth2,getUsers)
router.get("/getall",auth,getAllUsers)
router.post("/login",userLogin)

module.exports = router