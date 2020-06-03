const Sequelize = require("sequelize");
const sequelize = new Sequelize("std_272", "std_272", "std272mospolytech", {
    dialect: "mysql",
    host: "std-mysql.ist.mospolytech.ru",
    define: {
        timestamps: false
    }
});

module.exports = sequelize