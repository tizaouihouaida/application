const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: process.env.host,
    database: process.env.database,
    username: process.env.user,
    password: process.env.password,
    dialect: 'mysql',
    logging: console.log,
});


async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('unable to connect to the database', error);
    }
}

module.exports = { sequelize, connectToDatabase };