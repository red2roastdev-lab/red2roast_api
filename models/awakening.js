import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Awakening = db.define('awakening', {
  email: {
    type: DataTypes.STRING
  },
},
{
  freezeTableName: true,
})

export default Awakening
