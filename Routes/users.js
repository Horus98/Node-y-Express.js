import express from 'express'
import { createUser, getUser, deleteUser, updateUser, getUsers, getUserNamed } from '../Controllers/users.js'
import auth from '../Middlewares/auth.js'
const router = express.Router()

router.get('/', auth, getUsers)

router.post('/', auth, createUser)

router.get('/:id', auth, getUser)

router.delete('/:id', auth, deleteUser)

// Modificacion parcial del usuario (PATCH)
router.patch('/:id', auth, updateUser)

router.get('/name/:firstName', auth, getUserNamed)

export default router
