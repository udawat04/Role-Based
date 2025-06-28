const express = require("express")
const { createClient, getClients, clientLogin } = require("../controllers/clientsController")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/create",auth,createClient)
router.get("/",auth,getClients)
router.post("/login",clientLogin)



module.exports = router