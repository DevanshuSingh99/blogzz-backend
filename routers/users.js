import express from "express";
const router = express.Router();

import { getUsers, createUser, deleteUser, updateUser, loginUser } from "../controller/users.js";

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/", createUser);
router.delete("/", deleteUser);
router.patch("/", updateUser);

export default router;
