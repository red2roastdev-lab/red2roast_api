import { Router } from "express";
import leadRoutes from './leadRoutes.js'
import userRoutes from './userRoutes.js'

const router = Router();

// Mount route files
router.use("/lead", leadRoutes);
router.use("/partners", userRoutes);

export default router;
