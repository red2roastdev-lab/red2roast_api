import transporter from "../middleswares/emailTransporter.js";
import fs from "fs";
import path from "path";

// Function to send the welcome email
export const WelcomeEmail = async (referralCode) => {
    try {

        const mailOptions = {
            from: `"Admin from Red2Roast" <${process.env.EMAIL_USER}>`,
            to: `trevorkayiira@gmail.com`,
            subject: "Welcome to Red2Roast!",
            html: `
      <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You! Your Coffee Journey from Rwenzori Starts Here.</title>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            background-color: #F4F4F4;
        }

        table {
            border-spacing: 0;
            font-family: Arial, Helvetica, sans-serif;
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

<body style="margin: 0; padding: 0; min-width: 100%; background-color: #F4F4F4;">

    <center class="wrapper"
        style="width: 100%; table-layout: fixed; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <table class="main-content" width="100%" cellpadding="0" cellspacing="0" border="0"
            style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; border-collapse: collapse; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- HEADER / LOGO -->
            <tr>
                <td align="center" style="padding: 20px 0 10px 0;">
                    <img src="https://red2roast.shop/images/logo_vertical.png" alt="Red2Roast" width="150"
                        height="50" style="display: block; border: 0; max-width: 100%; height: auto;" />
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
                        Thank you for choosing to support **Red2Roast** and the incredible farmers in the Rwenzori
                        Mountains. By signing up, you are connecting directly with the source of some of the world’s
                        best specialty micro-lot coffee, right here in the Netherlands.
                    </p>

                    <!-- YVETTE SECTION -->
                    <h3 class="heading" style="font-size: 20px; line-height: 26px; margin: 0 0 15px 0; color: #B83321;">
                        🏔️ The Craftsmanship: Quality Guaranteed
                    </h3>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        This initiative is driven by passion, and by **Yvette**, our certified Q-Grader, who ensures the
                        meticulous quality of every small lot. Click her image below for a quick, personal welcome
                        video.
                    </p>

                    <!-- YVETTE IMAGE (CLICKABLE) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 25px 0;">
                        <tr>
                            <td align="center">
                                <a href="$$YVETTE_VIDEO_URL$$" target="_blank"
                                    style="text-decoration: none; display: inline-block;">

                                    <img src="https://placehold.co/300x160/B83321/ffffff?text=Yvette%20Welcome%20Video"
                                        alt="Yvette, Q-Grader - Click to Play Video" width="300"
                                        style="display: block; border-radius: 8px; border: 3px solid #B83321;" />
                                </a>
                            </td>
                        </tr>
                    </table>

                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 25px 0;">
                        You now have access to her personal blog where she shares stories of the Rwenzoris and the
                        rigorous process our coffee undergoes.
                    </p>

                    <hr style="border: 0; border-top: 1px solid #EEEEEE; margin: 30px 0;" />

                    <!-- CTA SECTION (UNLOCK COUPON) -->
                    <h3 class="heading" style="font-size: 20px; line-height: 26px; margin: 0 0 15px 0; color: #4B77BE;">
                        🎁 Your Personalized 10% OFF Gift Awaits!
                    </h3>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        We have reserved a special **10% OFF voucher** for your first micro-lot purchase. **To instantly
                        activate this discount and ensure we can personalize future communications**, we just need one
                        small detail.
                    </p>

                    <!-- BUTTON CTA TO MICRO-PAGE -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0 30px 0;">
                        <tr>
                            <td align="center">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 6px; background-color: #B83321;"
                                            bgcolor="#B83321">
                                            <a href="$$MICRO_PAGE_URL$$" target="_blank"
                                                style="font-size: 16px; font-weight: bold; text-decoration: none; color: #ffffff; background-color: #B83321; border: 1px solid #B83321; padding: 12px 25px; display: inline-block; border-radius: 6px;">
                                                Click here to unlock your 10% Coupon & Personalized Access
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <!-- REFERRAL SECTION -->
                    <h3 class="heading" style="font-size: 20px; line-height: 26px; margin: 0 0 15px 0; color: #5B8D5B;">
                        🤝 Double Your Reward: Free Delivery for Sharing
                    </h3>
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 15px 0;">
                        We’re building a community around exclusive coffee events, like cupping sessions, in the
                        Netherlands. If you know another coffee enthusiast who would appreciate this journey, invite
                        them along!
                    </p>
              
                    <p>
                        <a href="https://red2roast.shop/?ref=${referralCode}" target="_blank">Your Personalized Referral Link</a>
                    </p>
                  
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 15px 0; font-style: italic;">
                        **Action:** If one friend signs up after you activate your coupon, we will send you a **FREE
                        DELIVERY coupon** for your next order. It’s our way of thanking you for growing the Red2Roast
                        family.
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
</body>
      
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent`);
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};
