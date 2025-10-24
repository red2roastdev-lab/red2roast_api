export default (sequelize, DataTypes) => {
  const Awakening = sequelize.define("Awakening", {
    email: DataTypes.STRING,
    userAgent: DataTypes.STRING,
  },
    {
      tableName: "awakening"
    });

  return Awakening;
};
