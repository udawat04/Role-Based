const express = require("express")
const { createClass, getClass, updateClass } = require("../controllers/classController")
const auth3 = require("../middleware/auth3")
const router = express.Router()

router.post("/create",auth3,createClass)
router.get("/",auth3,getClass)
router.put("/classupdate",auth3,updateClass)

module.exports = router