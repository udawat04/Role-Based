const express = require("express")
const { createClient, getClients } = require("../controllers/clientsController")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/create",auth,createClient)
router.get("/",auth,getClients)



module.exports = router