const express = require("express")
const { createCourse, getCourses } = require("../controllers/courseController")

const router = express.Router()
const auth = require("../middleware/auth")

router.post("/create",auth,createCourse)
router.get("/",auth,getCourses)

module.exports = router