// models/user.js
export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
    {
      tableName: 'users'
    });

  // // Associations
  // User.associate = (models) => {
  //   User.hasMany(models.Post, { foreignKey: "userId" });
  // };

  return User;
};
