const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const Permission = require('./Permission');

class Role extends Model {};

Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'roles',
    paranoid: true,
    timestamps: true,
});


Permission.belongsToMany(Role, { through: 'RolePermissions' });
Role.belongsToMany(Permission, { through: 'RolePermissions' });

module.exports = Role;


// add index section to the model