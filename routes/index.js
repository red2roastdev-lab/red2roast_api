import { Router } from "express";
import leadRoutes from './leadRoutes.js'

const router = Router();

// Mount route files
router.use("/lead", leadRoutes);

export default router;
