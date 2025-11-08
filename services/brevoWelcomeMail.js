import { brevoApiInstance, SendSmtpEmail } from "../middleswares/brevoClient.js";
import { generateActivationToken } from "../utils/tokenUtils.js";

// Function to send the welcome email
export const brevoWelcomeEmail = async (lead) => {
    try {
        const { email, referral_code } = lead;

        // Create token to use instead of email
        const token = generateActivationToken({ email })

        // Dynamic links
        const activationLink = `${process.env.LIVE_HOST}/additional_information?r=${token}`;

        // The HTML body (Content omitted for brevity but remains the same)
        const htmlBody = `
             
             <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&display=swap"
        rel="stylesheet">
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            background-color: #F4F4F4;
            font-family: "Fraunces", serif;
        }

        table {
            border-spacing: 0;
            color: #333333;
        }

        td {
            padding: 0;
        }

        img {
            border: 0;
            max-width: 100%;
            height: auto;
            display: block;
        }

        .wrapper {
            width: 100%;
            table-layout: fixed;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        .main-content {
            background-color: #ffffff;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Styles */
        @media only screen and (max-width: 600px) {
            .main-content {
                width: 100% !important;
            }

            .content-padding {
                padding: 20px !important;
            }

            .heading {
                font-size: 24px !important;
                line-height: 28px !important;
            }
        }
    </style>
</head>

<body style="margin: 20px; padding: 0; min-width: 100%; background-color: #F4F4F4;">
<div style="height:20px"></div>
    <center class="wrapper"
        style="width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <table class="main-content" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; border-collapse: collapse; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- HEADER / LOGO -->
            <tr>
                <td align="center" style="padding: 20px 0 10px 0;">
                    <img src="https://red2roast.shop/images/R2RLogos_landscape.png" alt="Red2Roast" width="246"
                        height="80" style="display: block; border: 0; max-width: 100%; height: auto;" />
                </td>
            </tr>

            <!-- MAIN CONTENT AREA -->
            <tr>
                <td class="content-padding" style="padding: 40px 30px;">
                    <!-- GREETING -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 15px 0;">
                        Hello Fellow Coffee Enthusiast,
                    </p>

                    <!-- INTRO -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 25px 0;">
                        Thank you for choosing to support <b>Red2Roast</b> and the incredible farmers in the Rwenzori
                        Mountains. By signing up, you are connecting directly with the source of some of the world’s
                        best specialty coffee, right here in the Netherlands.
                    </p>

                    <!-- 	PERSONALISED SECTION -->
                    <h3 class="heading" style="font-size: 20px; line-height: 26px; margin: 0 0 2px 0; color: #000;">
                        Your Personalised Gift Awaits!
                    </h3>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        As we value you buying directly from the source, we have reserved a special <em><b>10% OFF
                                voucher</b></em> for your first purchase. Activate your personalised discount and keep
                        in touch with us directly.
                    </p>

                    <!-- BUTTON CTA TO MICRO-PAGE -->
                    <table width="70%" cellpadding="0" cellspacing="0" border="0" style="margin: auto">
                        <tr>
                            <td align="center">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 6px; background-color:#aaa197;"
                                            bgcolor="#aaa197">
                                            <a href="${activationLink}" target="_blank"
                                                style="font-size: 16px; font-weight: bold; text-decoration: none; color: #ffffff; background-color: #aaa197; border: 1px solid #aaa197; padding: 12px 25px; display: inline-block; border-radius: 6px;">
                                                Activate Membership
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- YVETTE IMAGE (CLICKABLE) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0 25px 0;">
                        <tr>
                            <td align="center">
                                <a href="https://cinema8.com/video/kXoEg35O" target="_blank"
  style="display:block; position:relative; text-decoration:none; line-height:0;">
  <img src="https://red2roast.shop/images/Yvette_video.png"
       alt="Watch Yvette's story"
       width="100%" style="display:block; border:0; max-width:100%;">
</a>

                            </td>
                        </tr>
                    </table>

                    <!-- HIGH QUALITY COFFEE -->
                    <h3 class="heading"
                        style="font-size: 20px; line-height: 26px; margin: 0 0 2px 0; color: #333; text-align: left;">
                        High quality coffee from the heart
                    </h3>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 10px 0;">
                        This initiative is driven by passion, as explains Yvette, our certified Q-Grader, who ensures
                        the meticulous quality of every small lot. Watch her video for her persoanl story and her love
                        for the Rwenzori mountain coffee.
                    </p>

                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 1px 0;">
                        Join our mailinglist to have access to her expert blog where she shares coffee insights and
                        stories of the Rwenzori mountain communities and the rigorous process their coffee undergoes.
                    </p>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td align="center"
                    style="padding: 20px 30px; font-size: 12px; line-height: 18px; color: #AAAAAA; border-top: 1px solid #EEEEEE;">
                    Best,<br />
                    The Red2Roast Team
                    <br /><br />
                    <a href="#" style="color: #AAAAAA; text-decoration: underline;">Unsubscribe</a> | Red2Roast |
                    Utrecht, Netherlands
                </td>
            </tr>
        </table>
    </center>
<div style="height:20px"></div>
</body>

</html>
        `;

        // 1. CONSTRUCT THE BREVO MESSAGE OBJECT 
        // CORRECTED: Use the imported SendSmtpEmail class directly
        const messagePayload = new SendSmtpEmail({ 
            // Must be a verified sender email in your Brevo account
            sender: {
                email: process.env.EMAIL_SENDER_ADDRESS,
                name: "Red2Roast Team"
            },

            // Send email to a single recipient (Brevo requires an array of objects)
            to: [{
                email: email
            }],

            subject: "Welcome to Red2Roast!",
            htmlContent: htmlBody, // Brevo uses htmlContent property
            tags: ["welcome-email"],
        });


        // 2. SEND THE EMAIL using the TransactionalEmailsApi instance
        const response = await brevoApiInstance.sendTransacEmail(messagePayload);

        // 3. Log the success using Brevo's response data
        console.log(`Welcome email sent via Brevo. Message ID: ${response.messageId}`);
    } catch (error) {
        // Log detailed error information from the Brevo response if available
        console.error("Error sending email notification via Brevo:", error.response?.text || error.message);
    }
};