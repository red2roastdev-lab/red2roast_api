import { Sequelize } from "sequelize";
import Order from "./orders.js";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const orderItem = db.define('order_items', {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price_at_purchase: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    batch_number: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true,
  });

  orderItem.belongsTo(Order, { foreignkey: 'order_id', as: 'order' })

export default orderItem;








