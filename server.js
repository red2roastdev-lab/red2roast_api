import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/database.js";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    "https://red2roast.shop",
    "https://red2roast.partners",
];

const connectDB = async () => {
    try {
        await db.authenticate();
        console.log("Database connected...");
    } catch (error) {
        console.error("Connection error:", error);
    }
};

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "GET", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  })
);

// FIXED preflight handler
app.options("*", (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  return res.sendStatus(204);
});

app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`Red2Roast Server listening on port ${PORT}!`)
);
