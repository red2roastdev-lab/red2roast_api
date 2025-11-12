import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Lead from "./lead.js";

const { DataTypes } = Sequelize;
// const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

const Coupon = db.define('coupons', {
  lead_id: {
    type: DataTypes.INTEGER,
    references: { model: 'leads', key: 'id' }
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

// Coupon.beforeCreate(async (coupon) => {
//   let generatedCode;

//   if (coupon.type === '10%_OFF') {
//     // Create discount in Shopify
//     const localCode = `R2R-${nanoid()}`;
//     const shopifyCode = await ShopifyWelcomeDC(localCode);

//     // Use the returned Shopify code or fallback
//     coupon.code = shopifyCode || localCode;
//   } else {
//     // For other coupon types, just generate locally
//     let unique = false;
//     while (!unique) {
//       generatedCode = `R2R-${nanoid()}`;
//       const existing = await Coupon.findOne({ where: { code: generatedCode } });
//       if (!existing) {
//         coupon.code = generatedCode;
//         unique = true;
//       }
//     }
//   }
// });

// Associations
Lead.hasMany(Coupon, { foreignKey: 'lead_id' });
Coupon.belongsTo(Lead, { foreignKey: 'lead_id' });

export default Coupon;
