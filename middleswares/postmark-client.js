import { ServerClient } from "postmark";
import dotenv from "dotenv";

dotenv.config();

// The Postmark API token is the only credential needed.
const POSTMARK_SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;

if (!POSTMARK_SERVER_TOKEN) {
    console.error("FATAL ERROR: POSTMARK_SERVER_TOKEN is not defined in environment variables.");
    // In a production app, you might throw an error or exit here.
}

// 1. Create the Postmark client instance
const postmarkClient = new ServerClient(POSTMARK_SERVER_TOKEN);

export default postmarkClient;