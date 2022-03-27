import express from "express";
import usersRoutes from "./Routes/users.js"

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/users", usersRoutes)

app.get("/", (req, res) => {
    console.log('Testing console in server')
    res.send("Hello from homePage!")
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))