import transporter from "../middleswares/emailTransporter.js";
import { generateActivationToken } from "../utils/tokenUtils.js";

// Function to send the welcome email
export const ReferralEmail = async (referrerName, referralCode, friendEmail) => {
    try {

        //create token to use instead of email

        //Dynamic links
        const referralLink = `${process.env.LIVE_HOST}/?ref=${referralCode}`;

        const mailOptions = {
            from: `"Red2Roast Team" <${process.env.EMAIL_USER}>`,
            to: friendEmail,
            subject: "Welcome to Red2Roast!",
            html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body style="margin: 20px; padding: 0; background-color: #F4F4F4; font-family: 'Fraunces', serif;">
<div style="height:20px"></div>

<center style="width: 100%;">

<table cellpadding="0" cellspacing="0" border="0" 
style="max-width: 600px; width:100%; margin:0 auto; background-color:#ffffff; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,.10);">

  <!-- LOGO -->
  <tr>
    <td align="center" style="padding: 25px 0;">
      <img src="https://red2roast.shop/images/R2RLogos_landscape.png"
      alt="Red2Roast" width="246" style="display:block; border:0;" />
    </td>
  </tr>

  <!-- MAIN COPY -->
  <tr>
    <td style="padding: 40px 35px; font-size:16px; line-height:26px; color:#333;">

      <p style="margin:0 0 18px 0;">Hello,</p>

      <p style="margin:0 0 18px 0;">
        <strong>${referrerName}</strong> thought you might enjoy being part of something meaningful,  a growing circle of people who love thoughtful, high-quality coffee and the connection that comes with it.
      </p>

      <p style="margin:0 0 18px 0;">
        At Red2Roast, we partner directly with smallholder farmers in the Rwenzori Mountains of Uganda. Each batch is carefully processed and roasted with intention; preserving the craft, the culture, and the livelihoods behind every cup.
      </p>

      <h3 style="margin:30px 0 12px 0; font-size:20px; color:#000;">
        Be part of the journey 
      </h3>

      <p style="margin:0 0 24px 0;">
        Joining our priority list means you’ll receive early access to our micro-lot releases, intimate coffee events, and personal stories from the communities that grow this coffee.
      </p>

      <!-- CTA BUTTON -->
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto;">
        <tr>
          <td align="center" bgcolor="#aaa197" 
          style="border-radius:6px; padding:0;">
            <a href="${referralLink}" target="_blank"
            style="display:inline-block; padding:12px 28px; font-weight:bold; color:#ffffff; text-decoration:none;">
              Join the Red2Roast Priority List
            </a>
          </td>
        </tr>
      </table>

      <p style="margin:26px 0 0 0; color:#555; font-style:italic; text-align:center;">
        “Coffee connects us. One cup, one story, one friendship at a time.” ☕
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

      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Invitation Email Sent`);
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};
