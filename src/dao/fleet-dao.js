'use strict';
/**
 *  This module is use to define DAO for fleet model
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

/**
 * export module
 */
module.exports = {
    /**
    * DAO for get list of fleet
    */
    getAllFleetData: function (reqObj, page, limit, sort, order) {
        return new Promise(function (resolve, reject) {
            logger.debug("get all fleet dao started");
            db.fleets.findAndCountAll({
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
            logger.debug("get all fleet dao finished");
        });
    },
    /**
    * DAO for get fleet details by id
    */
    getFleetDetails: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("get fleet dao started");
            db.fleets.findOne({
                where: reqObj,
            }).then(
                function (result) {
                    if (result) {
                        return resolve(result);
                    } else {
                        return reject(
                            util.responseUtil(null, null, responseConstant.FLEET_NOT_FOUND)
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
            logger.debug("get fleet dao finished");
        });
    },

    /**
    * DAO for create fleet
    */
    insertData: function (reqObj) {
        return new Promise(function (resolve, reject) {
            logger.debug("create fleet dao started");
            return db.fleets.create(reqObj).then(function (result) {
                return resolve(
                    result.dataValues
                )
            }, function (err) {
                console.log("error", err);
                return reject(util.responseUtil(err, null, responseConstant.SEQUELIZE_DATABASE_ERROR));
            });
            logger.debug("create fleet dao finished");
        });
    },

    /**
    * DAO for update fleet
    */
    updateData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Update fleet dao strated");
            db.fleets.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0])
                        return resolve(reqObj);
                    else
                        return reject(
                            util.responseUtil(null, result, responseConstant.FLEET_NOT_FOUND)
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
            logger.debug("Update fleet dao finished");
        });
    },

    /**
   * DAO for delete fleet
   */
    deleteData: function (reqObj, reqCondition) {
        return new Promise(function (resolve, reject) {
            logger.debug("Delete fleet dao strated");
            db.fleets.update(reqObj, { where: reqCondition }).then(
                function (result) {
                    if (result && result[0]) {
                        return resolve(result);
                    }
                    else {
                        return reject(
                            util.responseUtil(null, result, responseConstant.FLEET_NOT_FOUND)
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
            logger.debug("Delete fleet dao finished");
        });
    }
}
