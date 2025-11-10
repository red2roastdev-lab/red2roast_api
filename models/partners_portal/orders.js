import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import orderItem from "./orderItems.js";

const { DataTypes } = Sequelize;

const Order = db.define(
  "orders",
  {
    partner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
Order.hasMany(orderItem, { foreignKey: 'order_id', as: "orderItems" });

export default Order;
