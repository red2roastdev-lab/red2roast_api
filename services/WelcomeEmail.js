// Imports
import postmark from "postmark";
import fs from "fs";
import path from "path";

// Create Postmark client
const client = new postmark.ServerClient("62573b34-67df-49a6-abb8-850690ca9751");

// Function to send welcome email
export function sendWelcomeEmail(to, referralCode) {
  // Load your HTML email template
  const templatePath = path.join(process.cwd(), "templates/sampleMail.html");
  let htmlBody = fs.readFileSync(templatePath, "utf8");

  // Add referral link
  const referralLink = `https://red2roast.shop/?ref=${referralCode}`;
  htmlBody = htmlBody.replace(
    "</body>",
    `<div style="text-align:center;margin-top:20px;font-size:14px;">
       Share your referral link:<br/>
       <a href="${referralLink}" target="_blank">${referralLink}</a>
     </div></body>`
  );

  // Send the email
  client.sendEmail({
    From: "developer@red2roast.com",          // change to your verified sender
    To: "trevorkayiira@gmail.com",
    Subject: "Hello from Postmark",
    HtmlBody: htmlBody,
    TextBody: "Welcome to Red2Roast!",
    MessageStream: "outbound"
  });
}
