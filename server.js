import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./models/index.js";
import routes from "./routes/index.js";

dotenv.config({ quiet: true });

const { sequelize } = db;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://red2roast.shop');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});


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
