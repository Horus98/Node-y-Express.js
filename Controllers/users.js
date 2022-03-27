import { v4 as uuidv4 } from 'uuid';

let users = []

export const createUser = (req, res) => {
    const user = req.body
    users.push({...user, id: uuidv4() })
    res.send(`User with the name ${user.firstName} added to the DB !`)
}

export const getUser = (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => id === user.id)
    res.send(foundUser)
}

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

export const getUsers = (req, res) => {
    res.send(users)
}