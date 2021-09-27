const { Sequelize, Model, DataTypes } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mariadb',
    dialectOptions: {
        // Your mariadb options here
        // connectTimeout: 1000
        host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD,
        database: 'test2',
        port: 33060,
        connectionLimit: 5
    }
});
// https://sequelize.org/master/manual/dialect-specific-things.html
class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });
//
// (async () => {
//     await sequelize.sync();
//     const jane = await User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     });
//     console.log(jane.toJSON());
// })();
(async ()=>{
    const users = await User.findAll();
    console.log(JSON.stringify(users))
})();