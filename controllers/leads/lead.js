import Lead from "../../models/lead.js";
import Coupon from "../../models/coupon.js";
import Referral from "../../models/referral.js";
import axios from "axios";
import dotenv from "dotenv";
import { customAlphabet } from 'nanoid';
import { ShopifyWelcomeDC } from "../../shopify/ShopifyWelcome.js";
import { ShopifyFreeDeliveryNL } from "../../shopify/ShopifyFreeDelivery.js";
import db from "../../config/database.js";
import { WelcomeEmail } from "../../services/WelcomeEmail.js";
import { ReferralEmail } from "../../services/ReferralEmail.js";

dotenv.config();
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

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

// Create lead with transaction
export const createLead = async (req, res) => {
  const { email, fullname, referral_code } = req.body;

  // Basic validation
  if (!email || !fullname || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email or missing fullname" });
  }

  try {
    // Check if email already exists
    const existing = await Lead.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    // Use transaction for all DB operations
    const { lead, welcomeCoupon, deliveryCoupon } = await db.transaction(async (t) => {
      let referrer = null;
      if (referral_code) {
        referrer = await Lead.findOne({ where: { referral_code } }, { transaction: t });
      }

      const lead = await Lead.create({
        email,
        name: fullname,
        status: "activated",
        referral_source_id: referrer ? referrer.id : null,
        user_agent: "Unknown Device",
      }, { transaction: t });

      const welcomeCoupon = await Coupon.create({
        lead_id: lead.id,
        type: "WELCOME10_OFF",
        code: `R2R-${nanoid()}`,
      }, { transaction: t });

      let deliveryCoupon = null;
      if (lead.referral_source_id) {
        deliveryCoupon = await Coupon.create({
          lead_id: lead.referral_source_id,
          type: "FREE_DELIVERY",
          code: `R2R-${nanoid()}`,
        }, { transaction: t });
      }

      //Send welcome email
      (async () => {
        try {
          await WelcomeEmail({
            lead_name: lead.name,
            lead_email: lead.email,
            referral_code: lead.referral_code,
            coupon_code: welcomeCoupon.code,
          });
        } catch (err) {
          console.error("Failed to send welcome email:", err.message);
        }
      })();
      return { lead, welcomeCoupon, deliveryCoupon };
    });

    // After transaction is committed, call external APIs safely
    try {
      await ShopifyWelcomeDC(welcomeCoupon.code);

      if (deliveryCoupon) {
        await ShopifyFreeDeliveryNL(deliveryCoupon.code);
      }

      // Sync lead to Shopify
      await syncLeadToShopify(lead);
    } catch (shopifyErr) {
      console.error("Shopify sync failed:", shopifyErr.message);
    }

    return res.status(201).json({
      status: "success",
      message: "Lead created successfully",
      lead,
      welcomeCouponCode: welcomeCoupon.code,
    });

  } catch (err) {
    console.error("Error creating lead:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};
export const handleReferredFriend = async (req, res) => {
  try {
    const { friendEmail, referralCode } = req.body;

    if (!friendEmail || !referralCode) {
      return res.status(400).json({ message: "Missing friend email or referral code" });
    }

    // Find the lead who is referring
    const lead = await Lead.findOne({ where: { referral_code: referralCode } });

    console.log("friend email", friendEmail)

    if (!lead) {
      return res.status(404).json({ message: "Referrer not found" });
    }

    // Check if THIS referrer already referred this specific email
    const existingReferral = await Referral.findOne({
      where: {
        referred_email: friendEmail,
        referrer_id: lead.id,
      }
    });

    if (existingReferral) {
      return res.status(409).json({ message: "This friend has already been referred by you" });
    }

    //create new referral entry
    const referral = await Referral.create({
      referrer_id: lead.id,
      referred_email: friendEmail,
      status: "pending"
    });

    // send referral email
    (async () => {
      try {
        await ReferralEmail({
          friend_email: friendEmail,
          referrer_name: lead.name,
          referral_code: referralCode
        });
      } catch (err) {
        console.error("Failed to send welcome email:", err.message);
      }
    })();

    return res.json({ message: "Referral invite sent successfully" });

  } catch (err) {
    console.error("Error sending referral:", err.message);
    return res.status(500).json({ message: "Could not send referral" });
  }
};

//fetch lead
export const getLeadByEmail = async (req, res) => {
  const { email } = req.params;
  const lead = await Lead.findOne({ where: { email } });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
};