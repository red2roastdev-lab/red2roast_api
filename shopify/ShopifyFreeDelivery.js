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
                codes(first: 5) {
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
        title: "FREE_DELIVERY",
        code: uniqueCode2,
        combinesWith: {
          productDiscounts: true,
          orderDiscounts: true,
          shippingDiscounts: false,
        },
        startsAt: new Date().toISOString(),
        appliesOncePerCustomer: true,
        usageLimit: 1,
        customerSelection: { all: true },
        destinationSelection: {
            countries: ["NL"],
            includeRestOfWorld: false
        }
      }
    };

    console.log("Creating free shipping discount for Netherlands...");
    const response = await axios.post(
      `${process.env.SHOPIFY_GQL_URI}`,
      {
        query: mutation,
        variables: variables
      },
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Free shipping discount created successfully");
    console.log("Response", response.data.data);
    return uniqueCode2;

  } catch (err) {
    console.error("Shopify Free Shipping Discount creation failed:");
    console.error("Full error:", err);
    console.error("Response data:", err.response?.data);
    console.error("Response status:", err.response?.status);
    console.error("Error message:", err.message);
    return null;
  }
};

