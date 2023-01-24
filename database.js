const {Sequelize} = require('sequelize');
require("dotenv").config()
console.log(process.env.DB_HOST)

// module.exports = new Sequelize(
//     "",
//     "",
//     "",
//     {
//         host:"",
//         port:,
//         dialect:"postgres",
//         dialectOptions:{
//             ssl: "Amazon RDS",
//         },
//     }
// )