import Referral from "../models/referral.js";
import Lead from "../models/lead.js";

export const createReferral = async (req, res) => {
  try {
    const { referral_code, new_lead_email } = req.body;

    const referrer = await Lead.findOne({ where: { referral_code } });
    if (!referrer) return res.status(400).json({ error: "Invalid referral code" });

    const referral = await Referral.create({
      referrer_id: referrer.id,
      referral_code,
      status: "pending",
    });

    res.json({ message: "Referral recorded", referral });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update referral when the referred user completes activation
export const markReferralSuccessful = async (referralId) => {
  const referral = await Referral.findByPk(referralId);
  if (!referral) return null;

  referral.status = "successful";
  await referral.save(); // triggers afterUpdate hook -> creates free delivery coupon
  return referral;
};
