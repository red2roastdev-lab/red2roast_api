import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createShopifyDiscountCodeWelcome = async () => {
    const uniqueCode = `WELCOME_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
    try {
        await axios.post("https://red2roast.myshopify.com/admin/api/2025-10/price_rules/1437516529715/discount_codes.json",
            {
                discount_code: {
                    code: uniqueCode,
                },
            },
            {
                headers: {
                    "X-Shopify-Access-Token": "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",
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(res)
        console.log(`Created Shopify Discount Code: ${uniqueCode}`);
        return uniqueCode;

    } catch (err) {
        console.error("Shopify Discount Code creation failed:", err.response?.data || err.message);
        // Fallback: generate a local code if Shopify fails
        // return `LOCAL_${uniqueCode}`;
    }
};


export const createShopifyDiscountCodeFreeDelivery = async () => {
    const uniqueCode = `DELIVERY_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
        await axios.post(
            "https://red2roast.myshopify.com/admin/api/2025-10/price_rules/1437525180467/discount_codes.json",
            {
                discount_code: {
                    code: uniqueCode,
                },
            },
            {
                headers: {
                    "X-Shopify-Access-Token": "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",
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(`Created Shopify Discount Code: ${uniqueCode}`);
        return uniqueCode;

    } catch (err) {
        console.error("Shopify Discount Code creation failed:", err.response?.data || err.message);
        // Fallback: generate a local code if Shopify fails
        // return `LOCAL_${uniqueCode}`;
    }
};