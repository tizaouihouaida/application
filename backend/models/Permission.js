const { Model, DataTypes } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const PermissionGroup = require('./PermissionGroup');

class Permission extends Model {};

Permission.init({
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
    }
}, {
    sequelize,
    tableName: 'permissions',
    paranoid: true,
    timestamps: true,
});

PermissionGroup.hasMany(Permission, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});
Permission.belongsTo(PermissionGroup)

module.exports = Permission;

// add index section to the model