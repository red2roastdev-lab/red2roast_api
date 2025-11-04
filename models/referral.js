import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Coupon from "./coupon.js";
import Lead from "./lead.js";

const { DataTypes } = Sequelize;

const Referral = db.define(
  "referrals",
  {
    referrer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "leads",
        key: "id",
      },
    },
    referral_code: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "successful"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    freezeTableName: true,
  }
);

// 🔗 Associations
Referral.belongsTo(Lead, { foreignKey: "referrer_id", as: "referrer" });
Lead.hasMany(Referral, { foreignKey: "referrer_id", as: "referralsMade" });

// Hook to generate free delivery coupon after sucessful referral
Referral.afterUpdate(async (referral) => {
  if (referral.status === "successful") {
    const referrer = await Lead.findByPk(referral.referrer_id);
    if (!referrer) return;

    await Coupon.create({
      lead_id: referrer.id,
      type: "FREE_DELIVERY",
    });

    // Optionally, notify the referrer via email
    // sendEmail(referrer.email, "You've earned a free delivery coupon!", "Congrats!");
  }
});

export default Referral;
