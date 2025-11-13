import Lead from "../../models/lead.js";
import axios from "axios";
import dotenv from "dotenv";
import { customAlphabet } from 'nanoid';
import Coupon from "../../models/coupon.js";
import { ReferralEmail } from "../../services/ReferralEmail.js";
import { verifyActivationToken } from "../../utils/tokenUtils.js";
import { nodemailerWelcomeEmail } from "../../services/nodemailerWelcomeEmail.js";
import { nodemailerActivationEmail } from "../../services/nodemailerActivationEmail.js";
import { ShopifyWelcomeDC } from "../../shopify/ShopifyWelcome.js";
import { ShopifyFreeDeliveryNL } from "../../shopify/ShopifyFreeDelivery.js";

dotenv.config();
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

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
        await nodemailerWelcomeEmail(lead);
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

//shopify function
const syncLeadToShopify = async (lead) => {
  try {
    // Split full name into first and last name
    const nameParts = lead.name.trim().split(/\s+/); // split by any amount of whitespace
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; // handle middle/last names

    const res = await axios.post(
      process.env.SHOPIFY_API_URI,
      {
        customer: {
          email: lead.email,
          first_name: firstName,
          last_name: lastName,
          note: "Lead for Red2Roast",
          email_marketing_consent: {
            state: "subscribed",
            opt_in_level: "single_opt_in",
            consent_updated_at: new Date().toISOString()
          }
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Synced ${lead.email} to Shopify`, res.data);
  } catch (err) {
    console.error("Shopify sync failed:", err.response?.data || err.message);
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

    // const uniqueCode = `R2R-${nanoid()}`;
    const uniqueCode2 = `R2R-${nanoid()}`


    // Give 10% coupon
    await Coupon.create({
      lead_id: lead.id,
      type: "WELCOME10_OFF",
      code: uniqueCode2
    });

    // await ShopifyWelcomeDC(uniqueCode);
    await ShopifyFreeDeliveryNL(uniqueCode2)


    // Fetch the coupon we just created
    const leadCoupon = await Coupon.findOne({
      where: {
        lead_id: lead.id,
        type: "WELCOME10_OFF",
      },
    });


    //Give the referrer a FREE_DELIVERY Coupon if this user was reffered
    if (lead.referral_source_id) {

    // const uniqueCode2 = `R2R-${nanoid()}`

      await Coupon.create({
        lead_id: lead.referral_source_id,
        type: "FREE_DELIVERY",
        code: uniqueCode2
      })


      // await ShopifyFreeDeliveryNL(uniqueCode2)

    }

    // Activation Email: Fire-and-forget async call
    (async () => {
      try {
        await nodemailerActivationEmail({
          lead_name: lead.name,
          lead_email: lead.email,
          referral_code: lead.referral_code,
          couponCode: leadCoupon.code,
        });
      } catch (err) {
        console.error("Failed to send welcome email:", err.message);
      }
    })();
    
    //Sync to Shopify
    // await syncLeadToShopify(lead);
    (async () => {
      try {
        await syncLeadToShopify(lead);
      } catch (syncErr) {
        console.error("Failed to sync lead to Shopify:", syncErr.message);
      }
    })();

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


export const handleReferredFriend = async (req, res) => {
  try {
    const { friendEmail, referrerEmail, referralCode, referrerName } = req.body;

    // Find the lead who is referring
    const lead = await Lead.findOne({ where: { email: referrerEmail } });

    console.log("friend email", friendEmail)

    if (!lead) {
      return res.status(404).json({ message: "Referrer not found" });
    }

    // Fire and forget
    ReferralEmail(referrerName, referralCode, friendEmail);

    return res.json({ message: "Referral invite sent successfully" });

  } catch (err) {
    console.error("Error sending referral:", err.message);
    return res.status(500).json({ message: "Could not send referral" });
  }
};
