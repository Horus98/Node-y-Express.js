import express from 'express'
import usersRoutes from './Routes/users.js'
import authUseroutes from './Routes/authUser.js'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 10 // Limit each IP to 10 requests per `window` (here, per minute)
})

const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/users', usersRoutes)
app.use('/auth', authUseroutes)

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.get('/', (req, res) => {
    console.log('Testing console in server')
    res.send('Hello from homePage!')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message))

const closeConnection = () => {
    mongoose.connection.close()
}

export { app, closeConnection }
