import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./config/database.js";
// import db from "./models/index.js";
import routes from "./routes/index.js";

dotenv.config();

// const { sequelize } = db;
const app = express();


const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');
    } catch (error) {
        console.error('Connection error:', error);
    }
};

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors({
    origin: ['https://red2roast.shop', 'https://red2roast.partners', 'http://localhost:5173', 'https://red2roast.net', 'http://localhost:5174'],
    methods: ['POST', 'GET', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept'],
}));
app.use("/api", routes);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!")
});

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Red2Roast Server listening on port ${PORT}!`))

