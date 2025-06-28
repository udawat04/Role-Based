const express = require("express")
const { createUsers, getUsers } = require("../controllers/userController")
const auth2 = require("../middleware/auth2")

const router = express.Router()

router.post("/create",auth2,createUsers)
router.get("/",auth2,getUsers)

module.exports = router