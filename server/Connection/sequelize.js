const Sequelize = require("sequelize");
const sequelize = new Sequelize("std_272", "std_272", "std272mospolytech", {
    dialect: "mysql",
    host: "std-mysql.ist.mospolytech.ru",
    define: {
        timestamps: false
    }
});
//
// const sequelize = new Sequelize("std_272", "root", "root", {
//     dialect: "mysql",
//     host: "localhost",
//     port: "8889",
//     define: {
//         timestamps: false
//     }
// });

module.exports = sequelize