
'use strict';
/**
  This module is use to define vehicle model
  @module commonModel
  @author shweta.ghenand
  @version 1.0.0
*/
/**
  import npm modules
*/

var sequelize = require('../config/databaseConnection');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Vehicles', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        brandName: {
            type: DataTypes.STRING,
            allowNull: false

        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fuelType: {
            type: DataTypes.STRING,
            allowNull: true
        },
        registrationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        geoFencing: {
            type: DataTypes.STRING
        },
        yearOfManufacture: {
            type: DataTypes.STRING
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        deviceId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        fleetId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        isDeleted: {
            type: DataTypes.TINYINT,
            defaultValue: 0
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Active'
        },
    }, {
            tableName: 'vehicles',
            freezeTableName: true
        });
};
