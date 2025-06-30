const express = require("express")
const { createClass, getClass, updateClass, getAllClass } = require("../controllers/classController")
const auth3 = require("../middleware/auth3")
const auth2 = require("../middleware/auth2")
const router = express.Router()

router.post("/create",auth3,createClass)
router.get("/",auth3,getClass)
router.get("/getall",auth2,getAllClass)
router.put("/classupdate",auth3,updateClass)

module.exports = router