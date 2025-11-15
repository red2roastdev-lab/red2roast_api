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

app.use(cors());


app.use("/api", routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`Red2Roast Server listening on port ${PORT}!`)
);
