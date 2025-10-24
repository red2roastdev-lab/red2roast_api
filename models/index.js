import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import configFile from "../config/config.js"; // your config

const basename = path.basename(fileURLToPath(import.meta.url));
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  }
);

const db = { sequelize, Sequelize };

// Dynamically import all models
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

for (const file of modelFiles) {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, DataTypes);
  db[model.name] = model;
}

// Set up associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
