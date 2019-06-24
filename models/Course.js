const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { User } = require('../models');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './fsjstd-restapi.db'
});

class Course extends Model {}

Course.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT
    },
    estimatedTime: {
        type: Sequelize.STRING,
        allowNull: true
    },
    materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'course'
});

Course.belongsTo(User);

module.exports = Course;
