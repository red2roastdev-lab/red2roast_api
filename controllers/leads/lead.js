import Lead from "../../models/lead.js";
import Coupon from "../../models/coupon.js";
import { WelcomeEmail } from "../../services/WelcomeEmail.js";
import { verifyActivationToken } from "../../utils/tokenUtils.js";

// Landing page signup
export const createLead = async (req, res) => {
  try {
    const { email, referral_code } = req.body;

    // find the referrer Lead if code exists
    let referrer = null;
    if (referral_code) {
      referrer = await Lead.findOne({ where: { referral_code } })
    }

    // Capture user agent
    const userAgent = req.headers['user-agent'] || "Unknown Device";

    console.log("Submitted email:", email);


    // Validate input
    if (!email) {
      return res.status(400).json({
        status: "error",
        title: "Missing Information",
        message: "Please enter your email before submitting.",
      });
    }

    // Check if email already exists
    const existing = await Lead.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({
        status: "warning",
        title: "Already Subscribed",
        message: "This email is already on the priority list.",
      });
    }

    // Save new email
    const lead = await Lead.create({
      email,
      referral_source_id: referrer ? referrer.id : null,
      user_agent: userAgent
    });

    // Fire-and-forget async call
    (async () => {
      try {
        await WelcomeEmail(lead);
      } catch (err) {
        console.error("Failed to send welcome email:", err.message);
      }
    })();


    return res.status(201).json({
      status: "success",
      title: "You're In!",
      message: "Thanks for joining the priority list",
      lead,
    });


  } catch (error) {
    console.error("Error storing email:", error.message);
    return res.status(500).json({
      status: "error",
      title: "Something Went Wrong",
      message:
        "We couldn’t save your email right now. Please try again in a few moments.",
    });
  }
};

// Update name + give 10% coupon
export const updateLeadName = async (req, res) => {
  try {



    const { token, name } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Missing Activation Token" })
    }
    const decoded = verifyActivationToken(token)
    const { email } = decoded

    const lead = await Lead.findOne({ where: { email } });
    if (!lead) return res.status(404).json({ error: "User not found" });

    lead.name = name;
    lead.status = "activated";
    await lead.save();

    // Give 10% coupon
    await Coupon.create({
      lead_id: lead.id,
      type: "10%_OFF",
    });

    //Give the referrer a FREE_DELIVERY Coupon if this user was reffered
    if (lead.referral_source_id) {
      await Coupon.create({
        lead_id: lead.referral_source_id,
        type: "FREE_DELIVERY",
      })
    }

    res.json({ message: "Name updated and 10% coupon activated", lead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Optional: fetch lead
export const getLeadByEmail = async (req, res) => {
  const { email } = req.params;
  const lead = await Lead.findOne({ where: { email } });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
};
