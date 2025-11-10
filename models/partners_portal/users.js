import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending", "active"),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("partner", "admin"),
        allowNull: false
    }
},
    {
        freezeTableName: true,
    })

export default User
