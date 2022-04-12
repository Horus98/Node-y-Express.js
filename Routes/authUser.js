import express from 'express'
import { register, login, authUsers } from '../Controllers/authUser.js'

const routerAuth = express.Router()

routerAuth.post('/register', register)

routerAuth.post('/login', login)

routerAuth.get('/', authUsers)

export default routerAuth
