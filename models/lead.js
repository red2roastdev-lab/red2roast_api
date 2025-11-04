import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Lead = db.define('leads', {
    email: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    referral_source_id: {
        type: DataTypes.INTEGER
    },
    referral_code: {
        type: DataTypes.STRING,
        unique: true
    },
    status: {
        type: DataTypes.ENUM('new', 'activated', 'reward_earned'),
        defaultValue: "new"
    },
    user_agent: {
        type: DataTypes.STRING
    }
},
    {
        freezeTableName: true,
    });

//Lead Model Associations
Lead.associate = (models) => {
    //one lead can refer many others
    Lead.hasMany(models.Referral, {
        foreignKey: "referrer_id",
        as: "referralsMade"
    });

    //one lead can have many coupons
    Lead.hasMany(models.Coupon, {
        foreignKey: "lead_id",
        as: "coupons"
    })
};

Lead.beforeCreate(async (lead) => {
    let unique = false;
    let code;

    // Alphanumeric generator function
    function generateAlphanumericCode(length = 4) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Loop until we get a unique code
    while (!unique) {
        code = generateAlphanumericCode(4); // 4-character code

        // Check if it already exists
        const existing = await Lead.findOne({ where: { referral_code: code } });

        if (!existing) unique = true;
    }

    lead.referral_code = code;
});

// Lead.beforeCreate(async (lead) => {
//     let unique = false;
//     let code;

//     while(!unique) {
//         code = crypto.randomBytes(4).toString("hex").toUpperCase()

//         //check if it already exists
//         const existing = await Lead.findOne({where: { referral_code: code}})

//         if(!existing) unique = true;
//     }
//     lead.referral_code = code
// })

export default Lead
