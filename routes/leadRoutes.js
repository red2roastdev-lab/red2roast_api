import { Router } from "express";
import { createLead, handleReferredFriend } from "../controllers/leads/lead.js";

const router = Router();

// 1. Landing Page Signup (collect email)
router.post("/signup", createLead);

//2
router.post("/refer_friend", handleReferredFriend)

export default router;