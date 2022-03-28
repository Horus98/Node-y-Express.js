import mongoose from 'mongoose'
import User from '../Models/user.js'

let users = []

export const createUser = async(req, res) => {
    const user = req.body
    const newUser = new User(user)
    try {
        await newUser.save()
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

export const getUser = async(req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).exec();
        return res.status(200).json(user)

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id)
        return res.status(200).json({ id: id })
    } catch (error) {
        return res.status(404).json({ message: "No se ha podido eliminar al usuario" })
    }
}

export const updateUser = async(req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ message: `No user with id: ${_id}` })
    const userUpdate = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, userUpdate, { new: true })
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(404).json({ message: "No se pudo actualizar al usuario!" })
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}