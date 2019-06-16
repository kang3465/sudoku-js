const Sequelize = require('sequelize')
const sequelize = require('../sequelize/sequelize.js')

const ScoteModel = sequelize.define('scote', {
    userId: Sequelize.INTEGER,
    scote: Sequelize.INTEGER

})

module.exports = ScoteModel
