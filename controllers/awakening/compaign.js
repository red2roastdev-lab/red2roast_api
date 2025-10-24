import db from "../../models/index.js";

const { Awakening } = db;


// export const captureEmail = async (req, res) => {
//   try {
//     const { email } = req.body;
//     console.log("Submitted email", email)

  
//     const userAgent = req.headers['user-agent'];

    
//     if (!email || !userAgent ) {
//       return res.status(400).json({ error: "All fields are required" });
//     }


//     const awakening = await Awakening.create({
//       email,
//       userAgent,
//     });

//     res.status(201).json({
//       message: "Email created successfully",
//       awakening,
//     });
//   } catch (error) {
//     console.error("Error storing email:", error);
//     res.status(500).json({
//       error: "Failed to store email",
//       details: error.message,
//     });
//   }
// };

// Create a new post (email capture)
export const captureEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Submitted email:", email);

    const userAgent = req.headers["user-agent"];

    // Validate input
    if (!email || !userAgent) {
      return res.status(400).json({
        status: "error",
        title: "Missing Information",
        message: "Please enter your email before submitting.",
      });
    }

    // Check if email already exists
    const existing = await Awakening.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({
        status: "warning",
        title: "Already Subscribed",
        message: "This email is already on the priority list.",
      });
    }

    // Save new email
    const awakening = await Awakening.create({
      email,
      userAgent,
    });

    return res.status(201).json({
      status: "success",
      title: "You're In!",
      message: "Thanks for joining the priority list 🎉",
      awakening,
    });
  } catch (error) {
    console.error("Error storing email:", error);
    return res.status(500).json({
      status: "error",
      title: "Something Went Wrong",
      message:
        "We couldn’t save your email right now. Please try again in a few moments.",
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