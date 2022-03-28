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

export const deleteUser = (req, res) => {
    const { id } = req.params
    users = users.filter((user) => id != user.id)
    res.send(`User with ID: ${id} was deleted!`)
}

export const updateUser = (req, res) => {
    const { id } = req.params
    const { firstName, lastName, age, address } = req.body
    const user = users.find((user) => user.id == id)

    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (age) user.age = age
    if (address) user.address = address

    res.send(`User with ID: ${id} was updated!`)
}

export const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        console.log(users)
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}