const express = require("express")
const { createSuperAdmin, getSuperAdmin, superLogin } = require("../controllers/superAdminController")
const router = express.Router()

router.post("/create",createSuperAdmin)
router.get("/",getSuperAdmin)
router.post("/login",superLogin)



module.exports = router