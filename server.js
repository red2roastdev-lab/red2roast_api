import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import routes from "./routes/index.js";

dotenv.config({ quiet: true });

const { sequelize } = db;
const app = express();

// app.use(cors());
app.use(cors({
  origin: ['https://red2roast.shop', 'https://www.red2roast.shop', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Add PATCH if you use it for updates
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly list headers accepted from client
  exposedHeaders: ['X-Custom-Header', 'Content-Disposition'], // Headers client can access
  credentials: true
}));

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT
const HOST = process.env.HOST

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Oooh yeah, Database connected");

        await sequelize.sync({ alter: true });
        console.log("And all models synced");

        app.listen(PORT, () => {
            console.log(`Server running at http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error("Oops, DB connection failed:", error);
    }
}

startServer();
