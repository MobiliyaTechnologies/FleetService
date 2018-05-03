'use strict';
/**
 *  This module is use to define service for fleet model 
 *  @module fleetController
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
/**
 * npm modules
 */
var _ = require('underscore');
/**
 *  import project module
 */
var util = require("../util/commonUtil");
var fleetDao = require("../dao/fleet-dao");
var vehicleDao = require("../dao/vehicle-dao");
var vehicleService = require("../service/vehicle-service");
var async = require('async');
var responseConstant = require("../constant/responseConstant");
var db = require('../config/databaseConnection');
var empty = require('is-empty');
var config = require('../config/config.json');
config = config[config.activeEnv];


//Rest Calls:
//check whether fleet admin exist or not
var isFleetAdminExist = function (req, fleetAdminId, callback) {
    return new Promise(function (resolve, reject) {
        var get_data = JSON.stringify({});
        var options = {
            hostname: config.hostname_identity,
            port: config.port_identity,
            method: 'GET',
            path: '/users/' + fleetAdminId,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': get_data.length
            }
        };
        util.httpRequest(get_data, options, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    });
}

//update fleet of user
var updateFleet = function (req, userId, reqObj, callback) {
    return new Promise(function (resolve, reject) {
        var put_data = JSON.stringify(reqObj);
        var options = {
            hostname: config.hostname_identity,
            port: config.port_identity,
            method: 'PUT',
            path: '/users/' + userId,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': put_data.length
            }
        };

        util.httpRequest(put_data, options, function (err, result1) {
            if (err) {
                callback(err);
            } else {
                callback(err, result1);
            }
        });
    });
}

//update fleet of a fleet admin
var assignFleedIdtoFleetAdmin = function (req, fleetAdminId, fleetId, callback) {
    return new Promise(function (resolve, reject) {
        var put_data = JSON.stringify({ fleetId: fleetId });
        var options = {
            hostname: config.hostname_identity,
            port: config.port_identity,
            method: 'PUT',
            path: '/users/' + fleetAdminId,
            headers: {
                'Authorization': req.headers.authorization,
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'Content-Length': put_data.length
            }
        };
        util.httpRequest(put_data, options, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        });
    });
}



/**
  * export module
  */

module.exports = {
    /**
     * Controller function for get list of fleets
     */
    getAllFleetData: function (req) {
        return new Promise(function (resolve, reject) {

            var page = 0;
            var limit = 0;
            var sort = 'fleetName';
            var order = 'desc';
            var reqObj = {};


            //remove page,sort,order and limit variable if exist
            if (req.query.order && req.query.order == 'asc') {    //order of list           
                order = 'asc';
                //delete req.query.order;
            }
            if (req.query.sort) { //sort of list
                sort = req.query.sort;
                //delete req.query.sort;
            }
            if (req.query.limit) { //limit 
                limit = parseInt(req.query.limit);
                //delete req.query.limit
            }
            if (req.query.page) { //which page data 
                if (req.query.page >= 2)
                    page = (parseInt(req.query.page) - 1) * limit;
                else
                    page = 0;
            }
            if (req.query.fleetAdminId) {
                reqObj.fleetAdminId = req.query.fleetAdminId;
            }
            reqObj.isDeleted = 0;

            fleetDao.getAllFleetData(reqObj, page, limit, sort, order).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
   * Controller function for get fleet details by id
   */
    getFleetDetails: function (req) {
        return new Promise(function (resolve, reject) {
            fleetDao.getFleetDetails({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
     * Controller function for create fleet
     */
    insertData: function (req) {
        return new Promise(function (resolve, reject) {
            isFleetAdminExist(req, req.body.fleetAdminId, function (err, fleetAdminResult) {
                if (err) {
                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                } else {
                    if (fleetAdminResult.data === undefined) {
                        return reject(util.responseUtil(null, null, responseConstant.FLEET_ADMIN_NOT_FOUND));
                    }
                    if (fleetAdminResult.data.Tenant.id !== req.params.tenantId) {
                        return reject(util.responseUtil(null, null, responseConstant.FLEET_ADMIN_NOT_BELONGTO_TENANT));
                    }
                    else {
                        var insertObj = isEmptyCheck(req.body);
                        insertObj.tenantId = req.params.tenantId;
                        fleetDao.insertData(insertObj).then(function (result) {
                            assignFleedIdtoFleetAdmin(req, result.fleetAdminId, result.id, function (err, fleetAdminResult) {
                                if (err) {
                                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                } else {
                                }
                            });
                            if (!empty(req.body.vehicleIdList)) {
                                var updateObj = {};
                                updateObj.fleetId = result.id;
                                vehicleDao.updateManyFleetRecords(updateObj, req.body.vehicleIdList).then(function (result) {
                                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                }, function (err) {
                                    return reject(err);
                                });
                            }
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);

                        })
                    }
                }
            });

        });
    },


    /**
     * Controller function for update fleet
     */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = isEmptyCheck(req.body);
            updateObj.updatedAt = new Date();
            if (!empty(req.body.vehicleIdList)) {
                var updateFleet = {};
                if (req.body.isVehicleRemove && req.body.isVehicleRemove === true) {
                    updateFleet.fleetId = null;
                } else {
                    updateFleet.fleetId = req.params.id;
                }
                vehicleDao.updateManyFleetRecords(updateFleet, req.body.vehicleIdList).then(function (result) {
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }, function (err) {
                    return reject(err);
                });
            }
            else {
                fleetDao.updateData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                }, function (err) {
                    return reject(err);
                });
            }
        });
    },


    /**
      * Controller function for delete fleet
      */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = {};
            updateObj.updatedAt = new Date();
            updateObj.isDeleted = 1;
            var page = 0;
            var limit = 0;
            var sort = 'brandName';
            var order = 'desc';
            var reqObj = {};
            var asyncObject = {};
            reqObj.isDeleted = 0;
            var isDriverNotExist = false;
            var isVehicleNotExist = false;
            fleetDao.getFleetDetails({ id: req.params.id, isDeleted: 0 }).then(function (getFleetResult) {
                asyncObject.driverResult = function (callback) {
                    vehicleService.getDriverList(req, req.params.id, function (err, driverResult) {
                        if (err) {
                            callback(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                        } else {
                            if (driverResult.data === undefined) {
                                callback(util.responseUtil(null, null, responseConstant.DRIVER_NOT_FOUND));
                            } else {
                                if (driverResult.count === 0) {
                                    isDriverNotExist = true;
                                    callback(null, isDriverNotExist);
                                }
                                else if (driverResult.count === 1 && driverResult.data[0].id === getFleetResult.fleetAdminId) {
                                    isDriverNotExist = true;
                                    callback(null, isDriverNotExist)
                                } else {
                                    callback(null, isDriverNotExist);
                                }

                            }
                        }
                    });
                }

                reqObj.fleetId = req.params.id;
                asyncObject.vehicleResult = function (callback) {
                    vehicleDao.getAllVehicleData(reqObj, page, limit, sort, order).then(function (getVehicleResult) {
                        if (getVehicleResult.count === 0) {
                            isVehicleNotExist = true;
                            callback(null, isVehicleNotExist);
                        }
                        callback(null, isVehicleNotExist);

                    }, function (err) {
                        callback(err);
                    });
                }

                async.parallel(asyncObject, function (err, callabackResults) {
                    if (err) {
                        return reject(err);
                    } else {
                        if (callabackResults.driverResult === true && callabackResults.vehicleResult === true) {
                            fleetDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                                var obj = {};
                                obj.isRemoveFleet = 'true';
                                updateFleet(req, getFleetResult.fleetAdminId, obj, function (err, driverUpdateResult) {
                                    if (err) {
                                        return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                    } else {
                                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                    }

                                });
                                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                            }, function (err) {
                                return reject(err);
                            });
                        } else {
                            return reject(util.responseUtil(null, null, responseConstant.ERROR_IN_DELETION));
                        }

                    }
                });
            }, function (err) {
                return reject(err);
            });
        });
    }

}
/**
Function for empty check
 */
function isEmptyCheck(body) {
    var insertObj = {};
    if (!empty(body.fleetName)) {
        insertObj.fleetName = body.fleetName;
    }
    if (!empty(body.description)) {
        insertObj.description = body.description;
    }
    if (!empty(body.fleetAdminId)) {
        insertObj.fleetAdminId = body.fleetAdminId;
    }

    return insertObj;
}