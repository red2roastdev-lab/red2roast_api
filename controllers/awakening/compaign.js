import db from "../../models/index.js";

const { Awakening } = db;


// Create a new post
export const captureEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Submitted email", email)

    // Capture user-agent
    const userAgent = req.headers['user-agent'];

    // Basic validation
    if (!email || !userAgent ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create post
    const awakening = await Awakening.create({
      email,
      userAgent,
    });

    res.status(201).json({
      message: "Email created successfully",
      awakening,
    });
  } catch (error) {
    console.error("Error storing email:", error);
    res.status(500).json({
      error: "Failed to store email",
      details: error.message,
    });
  }
};

export const getEmails = async (req, res) => {
  try {

    // Find all captured emails
    const emails = await Awakening.findAll();

    if (!emails) {
      return res.status(404).json({ error: "No emails found" });
    }

    res.json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({
      error: "Failed to fetch emails",
      details: error.message,
    });
  }
};