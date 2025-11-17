import transporter from "../middleswares/emailTransporterMC.js";
import { generateActivationToken } from "../utils/tokenUtils.js";

// Function to send the welcome email
export const WelcomeEmail = async ({ lead_name, lead_email, referral_code, coupon_code }) => {
    try {
        //Dynamic links
        const referralLink = `${process.env.LIVE_HOST}/refer_friend?ref=${referral_code}`;

        const mailOptions = {
            from: `"Red2Roast Team" <${process.env.MC_EMAIL_USER}>`,
            to: lead_email,
            subject: "Welcome to Red2Roast!",
            html: `
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
            font-family: 'Open Sans', Helvetica, Arial, sans-serif;
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
            style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-spacing: 0; border-collapse: collapse; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: 'Open Sans', Helvetica, Arial, sans-serif;">

            <!-- HEADER / LOGO -->
            <tr>
                <td align="center" style="padding: 20px 0 10px 0;">
                    <img src="https://res.cloudinary.com/dgaf0sppm/image/upload/v1762629202/R2RLogos_landscape_dpjfqm.png" alt="Red2Roast" width="246"
                        height="80" style="display: block; border: 0; max-width: 100%; height: auto;" />
                </td>
            </tr>

            <!-- MAIN CONTENT AREA -->
            <tr>
                <td class="content-padding" style="padding: 40px 30px;">
                    <!-- GREETING -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 15px 0;">
                        Hello ${lead_name},
                    </p>

                    <!-- INTRO -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 25px 0;">
                        Welcome to the Red2Roast family and thank you for choosing to connect directly with the incredible farmers of the Rwenzori Mountains. By joining us, you’re supporting the source of some of the world’s finest specialty coffee, right here in the Netherlands.
                    </p>

                    <!-- 	PERSONALISED SECTION -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        To thank you for signing up, we've reserved a special 10% OFF voucher for your first purchase.
                    </p>

                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        Use this code: <strong>${coupon_code}</strong> <br>Redeem it at checkout when our shop officialy opens soon.
                    </p>

                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        But that's not all...
                    </p>

                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                        You can also invite a friend and earn an extra free delivery voucher
                    </p>
                    <!-- BUTTON CTA TO MICRO-PAGE -->
                    <table width="70%" cellpadding="0" cellspacing="0" border="0" style="margin: auto">
                        <tr>
                            <td align="center">
                                <table border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td align="center" style="border-radius: 6px; background-color:#aaa197;"
                                            bgcolor="#aaa197">
                                            <a href="${referralLink}" target="_blank"
                                                style="font-size: 16px; font-weight: bold; text-decoration: none; color: #ffffff; background-color: #aaa197; border: 1px solid #aaa197; padding: 12px 25px; display: inline-block; border-radius: 6px;">
                                                Invite a friend
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                    <p style="font-size: 16px; line-height: 24px; margin: 20px 0 20px 0;">
                        We’re excited to share our journey, our coffee, and our community with you
                    </p>

                    <!--  IMAGE (unCLICKABLE) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0 25px 0;">
                        <tr>
                            <td align="center">
                               <div style="width:100%; height: 300px; overflow:hidden;">

                                <a href="https://vimeo.com/red2roast/yvette" target="_blank"
                                style="display:block; position:relative; text-decoration:none; line-height:0;">
                                <img src="https://res.cloudinary.com/dgaf0sppm/image/upload/v1762956060/20251002_Red2Roast_DXanthopoulos_00050_ekjed8.jpg"
                                    alt="Rwenzori Mountains"
                                    width="100%" style="display:block; border:0; max-width:100%; height:100%; width: 100%;">
                                </a>
                                    </div>

                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- FOOTER -->
            <tr>
                <td align="center"
                    style="padding: 20px 30px; font-size: 12px; line-height: 18px; color: #AAAAAA; border-top: 1px solid #EEEEEE;">
                    Best,<br />
                    The Red2Roast Team
                    <br /><br />
                    Red2Roast |
                    Utrecht, Netherlands
                </td>
            </tr>
        </table>
    </center>
<div style="height:20px"></div>
</body>

</html>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Welcome Email Sent`);
    } catch (error) {
        console.error("Error sending email notification:", error);
        throw error;
    }
};
