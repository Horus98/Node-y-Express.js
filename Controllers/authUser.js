import AuthUser from '../Models/authUser.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(409).send({ message: 'Faltan datos' })
    }
    const user = await AuthUser.findOne({ email: email })
    if (user) {
        return res.status(409).send({ message: 'El usuario ya existe' })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = new AuthUser({ email: email.toLowerCase(), password: encryptedPassword, token: '' })
    const token = jwt.sign({ email: email.toLowerCase() }, process.env.TOKEN_KEY)
    newUser.token = token

    newUser.save()
        .then(() => {
            return res.status(200).send({ message: 'Usuario creado', token: token })
        })
}

export const login = async (req, res) => {
}

export const authUsers = async (req, res) => {
    try {
        const users = await AuthUser.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
