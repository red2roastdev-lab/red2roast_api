import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const Partner = db.define(
  "partners",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     contact_person: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_active: {
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    freezeTableName: true,
  }
);
export default Partner;
