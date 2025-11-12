import transporter from "../middleswares/emailTransporterMC.js";

// Function to send the welcome email
export const nodemailerActivationEmail = async ({ lead_name, lead_email, referral_code, couponCode }) => {
    try {

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
                        Hello, ${lead_name}
                    </p>

                    <!-- INTRO -->
                    <p style="font-size: 16px; line-height: 24px; margin: 0 0 25px 0;">
                        We're thrilled to have you with us, your journey into the heart of the Rwenzori Mountains starts here. Stay tuned as our webshop prepares to open its doors, and keep your code safe to enjoy your exclusive discount. Our journey has just begun, and we’re delighted to have you with us.
                    </p>

                    <!-- COUPON BOX -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0;">
                        <tr>
                            <td align="center" style="background-color:#aaa197; border-radius:8px; padding:18px;">
                                <p style="font-size:18px; margin:0 0 8px 0; font-weight:bold; color:#fff;">
                                    Your 10% Off Coupon 
                                </p>
                                <p style="font-size:20px; margin:0; font-weight:bold; color:#fff; letter-spacing:2px;">
                                    ${couponCode}
                                </p>
                                <p style="font-size:14px; margin-top:8px; color:#fff;">Copy and use it at checkout.</p>
                            </td>
                        </tr>
                    </table>

                   
                    
                    <!--  RED CHERRIES -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0 25px 0;">
                        <tr>
                            <td align="center">
                              <img src="https://res.cloudinary.com/dgaf0sppm/image/upload/v1762956060/20251002_Red2Roast_DXanthopoulos_00050_ekjed8.jpg"
       alt="Red Cherries"
       width="100%" style="display:block; border:0; max-width:100%;">

                            </td>
                        </tr>
                  </table>


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
        console.log(`Activation Email Sent`);
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};
