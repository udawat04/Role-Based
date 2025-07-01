const express = require("express")
const { createClass, getClass, updateClass, getAllClass } = require("../controllers/classController")

const router = express.Router()
const auth = require("../middleware/auth");
router.post("/create",auth,createClass)
router.get("/",auth,getClass)
router.get("/getall",getAllClass)
router.put("/classupdate",updateClass)

module.exports = router