// middleswares/brevoClient.js
import * as Brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

// Create instance of Transactional Email API
const brevoApiInstance = new Brevo.TransactionalEmailsApi();

// ✅ IMPORTANT: Brevo uses `apiKey` now, not `api-key`
brevoApiInstance.authentications['apiKey'].apiKey = process.env.BREVO_EMAIL_PASS;

// Export the email constructor class
const SendSmtpEmail = Brevo.SendSmtpEmail;

export { brevoApiInstance, SendSmtpEmail };
