import { Router } from "express";
import cors from 'cors';
import userRoutes from "./userRoutes.js";
import awakeningRoutes from "./awakeningRoutes.js"

const router = Router();

// Mount route files
router.use("/user", userRoutes);
router.use("/awakening", awakeningRoutes);

export default router;
