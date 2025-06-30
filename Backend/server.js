const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 5000
const superAdminRoutes = require("./routes/superAdminRoute")
const clientsRoute = require("./routes/clientsRoute")
const userRoute = require("./routes/userRoute")
const classRoute = require("./routes/classRoute")

mongoose.connect("mongodb+srv://udawat:1234@udawat.1cdje.mongodb.net/role-based");
const app = express()

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

app.use("/super-admin",superAdminRoutes)
app.use("/clients",clientsRoute)
app.use("/users",userRoute)
app.use("/classes",classRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on this port - ${PORT}`)
})