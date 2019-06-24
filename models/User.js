const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Course = require('./Course');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './fsjstd-restapi.db'
});

class User extends Model {}

User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    emailAddress: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            this.setDataValue("password", bcrypt.hashSync(val, bcrypt.genSaltSync(10)))
        }
    }
}, {
    sequelize,
    modelName: 'user'
});

User.hasMany(Course, {as: 'courses'});

module.exports = User;
