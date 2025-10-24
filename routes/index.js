import { Router } from "express";
import userRoutes from "./userRoutes.js";
import awakeningRoutes from "./awakeningRoutes.js"
import { testendpoint } from "../controllers/users/userController.js";

const router = Router();

// Mount route files
router.use("/user", userRoutes);
router.use("/rwenzori_awakening", awakeningRoutes);
router.use("/test", testendpoint)

export default router;
