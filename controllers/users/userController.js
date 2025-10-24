import db from "../../models/index.js";

const { User, Post } = db;

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Failed to create user",
      details: error.message,
    });
  }
};


// Get a user by ID including their posts
export const getUsers = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user with associated posts
    const user = await User.findByPk(id, {
      include: [
        {
          model: Post,
          as: "Posts", // optional, depends on your association naming
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      error: "Failed to fetch user",
      details: error.message,
    });
  }

};
