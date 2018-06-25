'use strict';
/**
 *  This module is use to define response constants
 *  @module responseConstants
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * npm modules
 */

/*
** Sequelize error code 
** undefined error code 
** Business logic error 
** Internal error code 
*/

var constants = {};

constants.SUCCESS = 0;

constants.SEQUELIZE_DATABASE_ERROR = 1001;
constants.SEQUELIZE_VALIDATION_ERROR = 1002;
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR = 1003;

constants.SEQUELIZE_CONSTRAINT_ERROR_CODE = 1005;
constants.UNDEFINED_DATABASE_ERROR = 1006;
constants.SEQUELIZE_DATABASE_ERROR_NAME_CODE = 1007;
constants.SEQUELIZE_VALIDATION_ERROR_NAME_CODE = 1008;
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME_CODE = 1009;


constants.RUN_TIME_ERROR = 1109;
constants.DUPLICATION_ERROR = 1111;
constants.UNAUTHORIZE = 1122;

constants.INVALID_REQUEST_PARAMETERS = 1124;
constants.INVALID_TENANTID = 1129;
constants.DB_CREATION_FAILED = 1130;
constants.DB_CONNECTION_FAILED = 1131;
constants.DB_DUPLICATION_ERROR = 1132;
constants.USER_EXIST = 1133;
constants.FLEET_ADMIN_NOT_FOUND = 1134;
constants.DEVICE_CREATION_ERROR = 1135;
constants.DEVICE_NOT_FOUND = 1136;
constants.FLEET_NOT_FOUND = 1137;
constants.DRIVER_NOT_FOUND = 1138;
constants.FLEET_ADMIN_NOT_BELONGTO_TENANT = 1139;
constants.DRIVER_NOT_BELONGTO_TENANT = 1140;
constants.FLEET_DELETION_ERROR = 1141;
constants.DEVICE_DELETION_ERROR = 1142;
constants.DEVICE_DUPLICATION_ERROR = 1143;
constants.DEVICE_DELETION_IOTHUB_ERROR = 1144;
constants.DEVICE_EXIST = 1145;
constants.FLEET_DUPLICATION_ERROR = 1146;
constants.VEHICLE_DUPLICATION_ERROR = 1147;
constants.VEHICLE_NOT_FOUND = 2008;

constants.SEQUELIZE_DATABASE_ERROR_NAME = 'SequelizeDatabaseError';
constants.SEQUELIZE_VALIDATION_ERROR_NAME = 'SequelizeValidationError';
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME = 'SequelizeForeignKeyConstraintError';
constants.SEQUELIZE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError';

/**
 * export module
 */
module.exports = constants;