import transporter from "../middleswares/emailTransporterMC.js";
import { generateActivationToken } from "../utils/tokenUtils.js";

// Function to send the onboarding email with temporary login credentials
export const onboardingEmail = async (email, tempPass) => {
    try {

        // Create token for activation link
        const token = generateActivationToken({ email });

        // Dynamic activation link
        const activationLink = `${process.env.LOCAL_HOST}/complete_registration/?r=${token}`;

        const mailOptions = {
            from: `"Red2Roast Team" <${process.env.MC_EMAIL_USER}>`,
            to: email,
            subject: "Welcome to Red2Roast!",
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
    body { font-family: 'Open Sans', Helvetica, Arial, sans-serif; background-color: #F4F4F4; margin: 0; padding: 0; }
    .main { max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h1 { color: #333; }
    p { color: #555; line-height: 1.5; }
    .button { background-color: #aaa197; color: #fff; padding: 12px 25px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold; }
    .credentials { background-color: #f4f4f4; padding: 15px; border-radius: 6px; font-family: monospace; margin: 15px 0; }
    .footer { font-size: 12px; color: #AAAAAA; margin-top: 30px; text-align: center; }
</style>
</head>
<body>
    <div class="main">
        <h1>Welcome to Red2Roast!</h1>
        <p>Hello Fellow Coffee Enthusiast,</p>
        <p>Thank you for joining <b>Red2Roast</b>. We’re excited to connect you directly with the farmers in the Rwenzori Mountains.</p>
        
        <h3>Your Temporary Login Credentials</h3>
        <div class="credentials">
            <p>Email: <b>${email}</b></p>
            <p>Password: <b>${tempPass}</b></p>
        </div>
        <p>Use the button below to activate your account and set a permanent password:</p>
        <a class="button" href="${activationLink}" target="_blank">Activate Your Account</a>

        <h3>High Quality Coffee from the Heart</h3>
        <p>This initiative is driven by passion, as explains Yvette, our certified Q-Grader, ensuring the meticulous quality of every small lot.</p>
        <p>Watch her story and join our mailing list for exclusive insights from the Rwenzori mountains.</p>

        <div class="footer">
            Best,<br />
            The Red2Roast Team<br />
            Utrecht, Netherlands
        </div>
    </div>
</body>
</html>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Onboarding Email Sent to ${email}`);
    } catch (error) {
        console.error("Error sending onboarding email:", error);
    }
};
