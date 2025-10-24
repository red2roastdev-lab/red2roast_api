import { Router } from "express";
import { captureEmail, getEmails } from "../controllers/awakening/compaign.js";

const router = Router();

router.post("/", captureEmail); //POST post
router.get("/", getEmails); //GET post

export default router;
