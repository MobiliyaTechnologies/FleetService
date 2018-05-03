'use strict';
/**
  This module is use to define device model
  @module commonModel
  @author shweta.ghenand
  @version 1.0.0
*/
/**
  import npm modules
*/
var sequelize = require('../config/databaseConnection');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Devices', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true

        },
        deviceName: {
            type: DataTypes.STRING,
            allowNull: false

        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        serialNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        protocolVersion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deviceType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hardwareVersion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastConnectedTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        isDeviceAssign: {
            type: DataTypes.TINYINT,
            defaultValue: 0 //false and 1 means true
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
            tableName: 'devices',
            freezeTableName: true
        });
};
