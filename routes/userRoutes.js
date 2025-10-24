import { Router } from "express";
import { getUsers, createUser } from "../controllers/users/userController.js";

const router = Router();

router.post("/", createUser); //POSt User
router.get("/:id", getUsers); //GET Users

export default router;
