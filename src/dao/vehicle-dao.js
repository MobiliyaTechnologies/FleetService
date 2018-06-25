'use strict';
/**
 *  This module is use to define DAO for vehicle model
 *  @module fleet-dao
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

var Sequelize = require('sequelize');
const Op = Sequelize.Op;
/**
 * export module
 */
module.exports = {
    /**
    * DAO for get list of vehicles
    */
    getAllVehicleData: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all vehicle dao started");
            db.vehicles.findAndCountAll({
                where: reqObj,
                limit: limit,
                offset: page,
                order: [[sort, order]],
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
            logger.debug("get all vehicle dao finished");
        });
    },
    /**
    * DAO for get vehicle details by id
    */
    getVehicleDetails: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get vehicle dao started");
            db.vehicles.findOne({
                where: reqObj,
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.VEHICLE_NOT_FOUND)
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

            logger.debug("get vehicle dao finished");
        });
    },

    /**
    * DAO for create vehicle
    */
    insertData: function (reqObj) {
        return new Promise(function (resolve, reject) {
            return db.vehicles.findAll({
                where: {
                    registrationNumber: reqObj.registrationNumber,
                    isDeleted: 0
                }
            }).then(function (existingVehicle) {
                if (existingVehicle.length == 0) {
                    logger.debug("create vehicle dao started");
                    return db.vehicles.create(reqObj).then(function (result) {
                        return resolve(
                            result.dataValues
                        )
                    }, function (err) {
                        return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
                    });
                }
                else {
                    return reject(util.responseUtil(null, null, responseConstant.VEHICLE_DUPLICATION_ERROR));
                }
            }, function (err) {
                logger.error(err);
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
            })
            logger.debug("create vehicle dao finished");
        });
    },

    /**
    * DAO for update vehicle
    */
    updateData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("update vehicle dao strated");
            db.vehicles.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        module.exports.getVehicleDetails(reqCondition).then(function (result) {
                            return resolve(result);
                        }, function (err) {
                            return reject(err);
                        });
                    else
                        return reject(
                            util.responseUtil(null, result, responseConstant.VEHICLE_NOT_FOUND)
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
            logger.debug("update vehicle dao finished");
        });
    },

    /**
   * DAO for delete vehicle
   */
    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("delete vehicle dao strated");
            db.vehicles.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.VEHICLE_NOT_FOUND)
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
            logger.debug("delete vehicle dao finished");
        });
    },
    /**
* DAO for update fleet of many vehicles
*/
    updateManyFleetRecords: function (reqObj, reqCondition) {

        return new Promise(function (resolve, reject) {
            logger.debug("update fleet of  vehicle dao strated");
            db.vehicles.update(reqObj, {
                where: {
                    id: {
                        [Op.in]: reqCondition
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
                }
                );
            logger.debug("update fleet of  vehicle dao finished");
        });
    }


}