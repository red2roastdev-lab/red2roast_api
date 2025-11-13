// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();


// export const ShopifyFreeDeliveryNL = async (uniqueCode2) => {
//   try {
//     const mutation = `
//       mutation discountCodeFreeShippingCreate($freeShippingCodeDiscount: DiscountCodeFreeShippingInput!) {
//         discountCodeFreeShippingCreate(freeShippingCodeDiscount: $freeShippingCodeDiscount) {
//           codeDiscountNode {
//             id
//             codeDiscount {
//               ... on DiscountCodeFreeShipping {
//                 codes(first: 5) {
//                   edges {
//                     node {
//                       code
//                     }
//                   }
//                 }
//               }
//             }
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;

//     const variables = {
//       freeShippingCodeDiscount: {
//         title: "FREE_DELIVERY",
//         code: uniqueCode2,
//         combinesWith: {
//           productDiscounts: true,
//           orderDiscounts: true,
//           shippingDiscounts: false,
//         },
//         startsAt: new Date().toISOString(),
//         appliesOncePerCustomer: true,
//         usageLimit: 1,
//         customerSelection: { all: true },
//         destinationSelection: {
//             countries: ["NL"],
//             includeRestOfWorld: false
//         }
//       }
//     };

//     console.log("Creating free shipping discount for Netherlands...");
//     const response = await axios.post(
//       `${process.env.SHOPIFY_GQL_URI}`,
//       {
//         query: mutation,
//         variables: variables
//       },
//       {
//         headers: {
//           "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("Free shipping discount created successfully");
//     console.log("Response", response.data.data.discountCodeFreeShippingCreate);
//     return uniqueCode2;

//   } catch (err) {
//     console.error("Shopify Free Shipping Discount creation failed:");
//     console.error("Full error:", err);
//     console.error("Response data:", err.response?.data);
//     console.error("Response status:", err.response?.status);
//     console.error("Error message:", err.message);
//     return null;
//   }
// };

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
        customerSelection: { all: true }
      }
    };

    console.log("=== DEBUG INFO ===");
    console.log("GraphQL URI:", process.env.SHOPIFY_GQL_URI);
    console.log("Code:", uniqueCode2);
    console.log("Variables:", JSON.stringify(variables, null, 2));
    
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

    console.log("=== FULL RESPONSE ===");
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(response.data, null, 2));

    // Check if response.data exists
    if (!response.data) {
      console.error("No data in response");
      return null;
    }

    // Check for GraphQL errors
    if (response.data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(response.data.errors, null, 2));
      return null;
    }

    // Check if data object exists
    if (!response.data.data) {
      console.error("No data.data in response");
      console.log("Full response.data:", JSON.stringify(response.data, null, 2));
      return null;
    }

    // Check for user errors
    const userErrors = response.data.data.discountCodeFreeShippingCreate?.userErrors;
    if (userErrors && userErrors.length > 0) {
      console.error("User Errors:", JSON.stringify(userErrors, null, 2));
      return null;
    }

    // Success
    const discountNode = response.data.data.discountCodeFreeShippingCreate?.codeDiscountNode;
    if (discountNode) {
      console.log("✅ Free shipping discount created successfully");
      console.log("Discount ID:", discountNode.id);
      return uniqueCode2;
    } else {
      console.error("No discount node returned");
      return null;
    }

  } catch (err) {
    console.error("=== ERROR CAUGHT ===");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    
    if (err.response) {
      // The request was made and the server responded with a status code
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
      console.error("Response data:", JSON.stringify(err.response.data, null, 2));
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received");
      console.error("Request:", err.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", err.message);
    }
    
    return null;
  }
};


