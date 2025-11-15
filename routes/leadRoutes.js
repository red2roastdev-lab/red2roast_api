import { Router } from "express";
import { createLead, getLeadByEmail, handleReferredFriend, updateLeadName } from "../controllers/leads/lead.js";

const router = Router();

// 1. Landing Page Signup (collect email)
router.post("/signup", createLead);

// 2. Patch lead to add name (activate 10% coupon)
// router.post("/update_name", updateLeadName);

// 3. Get lead by email (for frontend)
router.get("/:email", getLeadByEmail)

//4/ 
router.post("/refer_friend", handleReferredFriend)

export default router;