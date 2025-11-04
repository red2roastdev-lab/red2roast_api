import { Sequelize } from "sequelize";
import { customAlphabet } from 'nanoid';
import db from "../config/database.js";
import Lead from "./lead.js";

const { DataTypes } = Sequelize;

// Create a nanoid generator, e.g., 6 characters from A-Z and 0-9
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const Coupon = db.define('coupons', {
  lead_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'leads',
      key: 'id'
    }
  },
  type: {
    allowNull: true,
    type: DataTypes.ENUM('10%_OFF', 'FREE_DELIVERY'),
  },
  code: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('hidden', 'active', 'used'),
    defaultValue: 'hidden'
  }
}, {
  freezeTableName: true
});

// Hook to generate unique coupon code before creating
Coupon.beforeCreate(async (coupon) => {
  let unique = false;
  let generatedCode;
  while (!unique) {
    generatedCode = `R2R-${nanoid()}`; // e.g., R2R-A1B2C3
    const existing = await Coupon.findOne({ where: { code: generatedCode } });
    if (!existing) {
      coupon.code = generatedCode;
      unique = true;
    }
  }
});

// Associations
Lead.hasMany(Coupon, { foreignKey: 'lead_id' });
Coupon.belongsTo(Lead, { foreignKey: 'lead_id' });

export default Coupon;
