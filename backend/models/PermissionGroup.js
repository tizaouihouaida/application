const { DataTypes, Model } = require('sequelize');

const sequelize = require('../helpers/connect-to-database').sequelize;

class PermissionGroup extends Model {};

PermissionGroup.init({
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
    tableName: 'permissiongroups',
    paranoid: true,
    timestamps: true,
});

module.exports = PermissionGroup ;

// add index section to the model