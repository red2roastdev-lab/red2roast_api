import transporter from "../middleswares/emailTransporter.js";
import fs from "fs";
import path from "path";

// Function to send the welcome email
export const WelcomeEmail = async (to, referralCode) => {
  try {
    // Load the sample HTML template
    const templatePath = path.join(process.cwd(), "templates/sampleMail.html");
    let htmlBody = fs.readFileSync(templatePath, "utf8");

    // Inject referral link inside the HTML
    const referralLink = `https://red2roast.shop/?ref=${referralCode}`;

    htmlBody = htmlBody.replace(
      "</body>",
      `<div style="text-align:center;margin-top:20px;font-size:14px;">
         <p>Share your referral link:</p>
         <a href="${referralLink}" target="_blank">${referralLink}</a>
       </div></body>`
    );

    const mailOptions = {
      from: `"Admin from Red2Roast" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Welcome to Red2Roast!",
      html: htmlBody,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email notification:", error);
  }
};
