'use strict';
/**
 *  This module is use to define Utility functions 
 *  @module CommonUtility
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * import project modules
 */
var constant = require("../constant/constants");
const secret = 'm@b1l1y@';
var iothub = require('azure-iothub');
var https = require('http');
var config = require('../config/config.json');
config = config[config.activeEnv];
var connectionString = config.iothub.CONNECTION_STRING;
var registry = iothub.Registry.fromConnectionString(connectionString);


/**
 * export module
 */
module.exports = {

    /**
     * Utility function for response util
     */
    responseUtil: function (error, data, code) {
        var constants = require('../constant/responseConstant');
        var message = require('../constant/message');
        var response = {};
        if ((code == null || code == undefined) && (error == null || error == undefined)) {
            throw new Error("Please Send code or error message");
        } else if (code == null || code == undefined) {
            if (error.name === constants.SEQUELIZE_DATABASE_ERROR_NAME)
                code = constants.SEQUELIZE_DATABASE_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_VALIDATION_ERROR_NAME)
                code = constants.SEQUELIZE_VALIDATION_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME)
                code = constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME_CODE;
            else if (error.name === constants.SEQUELIZE_CONSTRAINT_ERROR)
                code = constants.SEQUELIZE_CONSTRAINT_ERROR_CODE;
            else
                code = constants.UNDEFINED_DATABASE_ERROR;
        }
        //response.status = code;
        response.message = message.getMessage(code);
        if (error != null) {
            response.error = error;
            if (error.message != null || error.message != undefined) {
                response.message = response.message + ' :: ' + error.message;
            }

        }
        if (data != null) {
            if (!data.hasOwnProperty('rows')) {
                response.data = data;
            }
            else {
                response.count = data.count;
                response.data = data.rows;
            }
        }
        return response;
    },

    /**
   * Function for creating device on IOTHub
   **/
    createDeviceOnIOTHub: function (deviceName, callback) {
        var device = {
            deviceId: deviceName
        }
        registry.create(device, function (err, deviceInfo, res) {
            if (err) {
                registry.get(device.deviceId, printDeviceInfo);
            }
            if (deviceInfo) {
                printDeviceInfo(err, deviceInfo, res)
            }
        });
        function printDeviceInfo(err, deviceInfo, res) {
            if (deviceInfo) {
                console.log('Device ID: ' + deviceInfo.deviceId);
                console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
                callback(null, deviceInfo);
            } else {
                callback(err);
            }
        }
    },
    /**
    * Function for remove device from IOTHub
    **/
    removeDeviceFromIOTHub: function (deviceName, callback) {
        registry.delete(deviceName, function (err, deviceInfo, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, true);
            }
        });
    },

    /**
  * httpRequest utility function
  * @param  {Object} req
  */
    httpRequest: function (reqData, options, callback) {
        var getReq = https.request(options, function (res) {
            var responseObj = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                responseObj += chunk;
            });
            res.on('end', function () {
                return callback(null, JSON.parse(responseObj));
            });
        });

        getReq.write(reqData);
        //end the request
        getReq.end();
        getReq.on('error', function (err) {
            //console.log("Error: ", err);
            return callback(err);
        });
    },


}


