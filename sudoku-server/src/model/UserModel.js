const Sequelize = require('sequelize')
const sequelize = require('../sequelize/sequelize.js')

const UserModel = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING
})

module.exports = UserModel
