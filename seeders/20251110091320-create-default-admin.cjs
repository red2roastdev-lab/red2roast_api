const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("Admin@123", saltRounds);

    // Check if admin already exists
    const [existingAdmins] = await queryInterface.sequelize.query(
      `SELECT * FROM users WHERE email = 'admin@red2roast.com';`
    );

    if (existingAdmins.length === 0) {
      await queryInterface.bulkInsert("users", [
        {
          username: "Super Admin",
          email: "admin@red2roast.com",
          password: hashedPassword,
          role: "admin",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      console.log("Default admin account created: admin@red2roast.com / Admin@123");
    } else {
      console.log("Admin already exists, skipping seeder.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", { email: "admin@red2roast.com" });
  },
};
