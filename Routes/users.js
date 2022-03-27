import express from "express";
import { createUser, getUser, deleteUser, updateUser, getUsers } from "../Controllers/users.js";

const router = express.Router();



router.get("/", getUsers)

router.post("/", createUser)

router.get("/:id", getUser)

router.delete("/:id", deleteUser)

// Modificacion parcial del usuario (PATCH)
router.patch("/:id", updateUser)

export default router;