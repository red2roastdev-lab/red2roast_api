import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const ShopifyFreeDeliveryNL = async (uniqueCode2) => {
  try {
    const mutation = `
      mutation discountCodeFreeShippingCreate($freeShippingCodeDiscount: DiscountCodeFreeShippingInput!) {
        discountCodeFreeShippingCreate(freeShippingCodeDiscount: $freeShippingCodeDiscount) {
          codeDiscountNode {
            id
            codeDiscount {
              ... on DiscountCodeFreeShipping {
                title
                startsAt
                codes(first: 1) {
                  edges {
                    node {
                      code
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = {
      freeShippingCodeDiscount: {
        title: `FREE_DELIVERY_${uniqueCode2}`,
        code: uniqueCode2,
        combinesWith: {
          productDiscounts: true,
          orderDiscounts: true,
          shippingDiscounts: false,
        },
        startsAt: new Date().toISOString(),
        appliesOncePerCustomer: true,
        customerSelection: { all: true },
        destinationSelection: {
          countries: {
            countries: ["NL"],
            includeRestOfWorld: false,
          },
        },
      },
    };

    console.log(`🚀 Creating Free Shipping Discount for NL: ${uniqueCode2}`);

    const response = await axios.post(
      process.env.SHOPIFY_GQL_URI,
      { query: mutation, variables },
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data.data.discountCodeFreeShippingCreate;
    const userErrors = data?.userErrors || [];

    // 🧩 Handle Shopify userErrors properly
    if (userErrors.length > 0) {
      console.error("❌ Shopify userErrors:", userErrors);
      throw new Error(`Shopify GraphQL error: ${userErrors[0].message}`);
    }

    const createdCode =
      data?.codeDiscountNode?.codeDiscount?.codes?.edges?.[0]?.node?.code || null;

    if (createdCode) {
      console.log(`✅ Free Shipping Code Created: ${createdCode}`);
      return createdCode;
    } else {
      throw new Error("Discount created but no code returned from Shopify");
    }
  } catch (err) {
    console.error("💥 Shopify Free Shipping Discount creation failed:");
    console.error("Error Message:", err.message);
    if (err.response) {
      console.error("Response Status:", err.response.status);
      console.error("Response Data:", JSON.stringify(err.response.data, null, 2));
    }
    return null;
  }
};
