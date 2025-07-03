const express = require("express")
const { createBatch, getBatch } = require("../controllers/batchController")
const router = express.Router()
const auth = require("../middleware/auth")

router.post("/create",auth,createBatch)
router.get("/",auth,getBatch)

module.exports = router