const Sequelize = require('sequelize')
const sequelize = require('../sequelize/sequelize.js')

const UserModel = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = UserModel
