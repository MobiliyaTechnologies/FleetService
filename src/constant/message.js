'use strict';
/**
 *  This module is use to define error messages
 *  @module message
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * import project modules
 */
var constants = require('./responseConstant');
var err_obj = [];
var store = {};


err_obj[constants.SUCCESS] = "Success";

err_obj[constants.SEQUELIZE_DATABASE_ERROR] = "Invalid request information";//"Database query is wrong.";
err_obj[constants.SEQUELIZE_VALIDATION_ERROR] = "Validation failed";//"Database validation failed";
err_obj[constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR] = "Invalid request information";// "Database Foreign Key Data not available."
err_obj[constants.SEQUELIZE_CONSTRAINT_ERROR_CODE] = "Invalid request information";//"Database unique field data required."
err_obj[constants.UNDEFINED_DATABASE_ERROR] = "Invalid request information";//"Database undefined error."

err_obj[constants.RUN_TIME_ERROR] = "Internal Server Error";
err_obj[constants.DUPLICATION_ERROR] = "Record already exist";
err_obj[constants.DEVICE_NOT_FOUND] = "Device not found";
err_obj[constants.FLEET_NOT_FOUND] = "Fleet not found";
err_obj[constants.VEHICLE_NOT_FOUND] = "Vehicle not found";
err_obj[constants.UNAUTHORIZE] = "We are sorry but we are not able to authenticate you. Login again";
err_obj[constants.INVALID_REQUEST_PARAMETERS] = "Invalid request ";
err_obj[constants.INVALID_TENANTID] = "Invalid tenantId";
err_obj[constants.DB_CREATION_FAILED] = "DB creation failed";
err_obj[constants.DB_CONNECTION_FAILED] = "DB connection failed";
err_obj[constants.DB_DUPLICATION_ERROR] = "DB already exist.";
err_obj[constants.USER_EXIST] = "Vehicle already assigned for provided user";
err_obj[constants.FLEET_ADMIN_NOT_FOUND] = "FleetAdmin not found ";
err_obj[constants.DEVICE_CREATION_ERROR] = "Unable to create device";
err_obj[constants.DEVICE_DELETION_ERROR] = "Unable to delete device";
err_obj[constants.DRIVER_NOT_FOUND] = "Driver is not found ";
err_obj[constants.FLEET_ADMIN_NOT_BELONGTO_TENANT] = "Fleet Admin does not belong to tenant";
err_obj[constants.DRIVER_NOT_BELONGTO_TENANT] = "Driver does not belong to tenant";
err_obj[constants.ERROR_IN_DELETION] = "Unable to delete fleet";
err_obj[constants.DEVICE_DUPLICATION_ERROR] = "Device already exist ";

/**
 * function for get message from error code
 */
store.getMessage = function (code) {
    return err_obj[code];
};
/**
 * export module
 */
module.exports = store;
