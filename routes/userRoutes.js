import { Router } from "express";
import { completeRegistration, createAdmin, handleLogin, requestAccess } from "../controllers/partners_portal/users.js";
import { getPartnerByEmail } from "../controllers/partners_portal/partner.js";

const router = Router();

router.post("/request-access", requestAccess);
router.post("/complete-registration", completeRegistration);
router.post("/login-request", handleLogin);
router.post("/get-partner", getPartnerByEmail);
router.post("/add-admin", createAdmin)


export default router;
