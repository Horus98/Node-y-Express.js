import express from "express";
import usersRoutes from "./Routes/users.js"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/users", usersRoutes)

app.get("/", (req, res) => {
    console.log('Testing console in server')
    res.send("Hello from homePage!")
})
const CONNECTION_URL = "mongodb+srv://admin:admin@cluster0.ex5zz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message))