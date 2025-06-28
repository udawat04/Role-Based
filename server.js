const express = require("express")

const mongoose = require("mongoose")
const PORT = 5000
const superAdminRoutes = require("./routes/superAdminRoute")
const clientsRoute = require("./routes/clientsRoute")
const userRoute = require("./routes/userRoute")

mongoose.connect("mongodb+srv://udawat:1234@udawat.1cdje.mongodb.net/role-based");
const app = express()

app.use(express.json())

app.use("/super-admin",superAdminRoutes)
app.use("/clients",clientsRoute)
app.use("/users",userRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on this port - ${PORT}`)
})