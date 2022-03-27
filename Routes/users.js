import express from "express";
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let users = []

router.get("/", (req, res) => {
    console.log("GET all users")
    res.send(users)
})

router.post("/", (req, res) => {
    const user = req.body
    users.push({...user, id: uuidv4() })
    res.send(`User with the name ${user.firstName} added to the DB !`)
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    const foundUser = users.find((user) => id === user.id)
    res.send(foundUser)
})

router.delete("/:id", (req, res) => {
    const { id } = req.params
    users = users.filter((user) => id != user.id)
    res.send(`User with ID: ${id} was deleted!`)
})

export default router;