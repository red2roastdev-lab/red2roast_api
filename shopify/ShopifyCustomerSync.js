import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const syncLeadToShopify = async (lead) => {
  try {
    // Split full name into first and last name
    const nameParts = lead.name.trim().split(/\s+/); // split by any amount of whitespace
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; // handle middle/last names

    const res = await axios.post(
      process.env.SHOPIFY_API_URI2,
      {
        customer: {
          email: lead.email,
          first_name: firstName,
          last_name: lastName,
          accepts_marketing: true,
          note: "Lead for Red2Roast",
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

