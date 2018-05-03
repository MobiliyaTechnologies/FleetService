
"use strict";

/**
  This module is use to define fleet model
  @module commonModel
  @author shweta.ghenand
  @version 1.0.0
*/
/**
  import npm modules
*/
var sequelize = require('../config/databaseConnection');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Fleets', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fleetName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true

        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tenantId: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'tenantId can not be empty.'
                }
            }
        },
        fleetAdminId: {
            type: DataTypes.UUID,
            allowNull: true,
            validate: {
                len: {
                    args: [1, 255],
                    msg: 'fleetAdminId can not be empty.'
                }
            }
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
            tableName: 'fleets',
            freezeTableName: true
        });
};
