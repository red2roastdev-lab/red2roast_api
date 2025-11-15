import axios from "axios";
import dotenv from "dotenv";

dotenv.config();


export const ShopifyWelcomeDC = async (uniqueCode) => {
  try {
    const mutation = `
  mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
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
    basicCodeDiscount: {
      title: "WELCOME10_OFF",
      code: uniqueCode,
      combinesWith: {
        productDiscounts: true,
        orderDiscounts: true,
        shippingDiscounts: true,
      },
      startsAt: new Date().toISOString(),
      appliesOncePerCustomer: true,
      usageLimit: 1,
      customerSelection: { all: true },
      customerGets: {
        value: { percentage: 0.1 },
        items: { all: true },
      },
    }
  };


    console.log("starting execution.......................................")
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
    console.log("ending execution.......................................")
    console.log("Response", response.data.data)
    return uniqueCode;

  } catch (err) {
    console.error("Shopify Welcome Discount Code creation failed:");
    console.error("Full error:", err);
    console.error("Response data:", err.response?.data);
    console.error("Response status:", err.response?.status);
    console.error("Error message:", err.message);
    return null;
  }
};
