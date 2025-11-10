import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Batch = db.define(
  "orders",
  {
    batch_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     farmer_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
export default Batch;
