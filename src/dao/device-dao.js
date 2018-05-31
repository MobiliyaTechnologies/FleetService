'use strict';
/**
 *  This module is use to define DAO for device model
 *  @module device-dao
 *  @author shweta.ghenand
 *  @version 1.0.0
 */


/**
 * import project modules
 */
var util = require("../util/commonUtil");
var responseConstant = require("../constant/responseConstant");
var logger = require("../util/logger");
var db = require("../config/databaseConnection");
const Sequelize = require('sequelize');
const Op = Sequelize.Op
/*
 * export module
 */
module.exports = {
    /**
    * DAO for get list of devices
    */
    getAllDeviceData: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all device dao started");
            db.devices.findAndCountAll({
                where: reqObj,
                limit: limit,
                offset: page,
                order: [[sort, order]],
                attributes: ['id', 'deviceName', 'serialNo', 'protocolVersion', 'deviceType', 'description', 'updatedAt', 'createdAt', 'isDeleted', 'status', 'hardwareVersion', 'isDeviceAssign']
            }).then(
                function (result) {
                    return resolve(result);
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("get all device dao finished");
        });
    },
    /**
    * DAO for get device details by id
    */
    getDeviceDetails: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get device dao started");
            db.devices.findOne({
                where: reqObj,
                attributes: ['id', 'deviceName', 'serialNo', 'protocolVersion', 'deviceType', 'description', 'updatedAt', 'createdAt', 'isDeleted', 'status', 'hardwareVersion', 'isDeviceAssign']
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.DEVICE_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("get device dao finished");
        });
    },

    /**
    * DAO for create device
    */
    insertData: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("create device dao started");
            return db.devices.create(reqObj).then(function (result) {
                return resolve(
                    result.dataValues
                )
            }, function (err) {
                logger.error(err);
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
            });
            logger.debug("create device dao finished");
        });
    },

    /**
    * DAO for update device
    */
    updateData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("update device dao strated");
            db.devices.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve(reqObj);
                    else
                        return reject(
                            util.responseUtil(null, result, responseConstant.DEVICE_NOT_FOUND)
                        );
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                }
            );
            logger.debug("update device dao finished");
        });
    },

    /**
   * DAO for delete device
   */
    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("delete device dao strated");
            db.devices.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.DEVICE_NOT_FOUND)
                        );
                    }
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("delete device dao finished");
        });
    },

  /**
   * DAO for get list of devices by id
   */
    getDeviceList: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get  device list dao started");
            db.devices.findAll({
                where: {
                    id: {
                        [Op.in]: reqObj,
                    }
                }
            }).then(
                function (result) {
                    return resolve(result);
                },
                function (err) {
                    logger.error(err);
                    return reject(
                        util.responseUtil(
                            err,
                            null,
                            responseConstant.SEQUELIZE_DATABASE_ERROR
                        )
                    );
                });
            logger.debug("get  device list dao finished");
        });
    },
}