'use strict';
/**
 *  This module is use to define controller for vehicle model 
 *  @module fleetController
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
/**
 *  import project module
 */
var util = require("../util/commonUtil");
var vehicleDao = require("../dao/vehicle-dao");
var deviceDao = require('../dao/device-dao');
var fleetDao = require('../dao/fleet-dao');
var responseConstant = require("../constant/responseConstant");
var async = require('async');
var empty = require('is-empty');
var config = require('../config/config.json');
config = config[config.activeEnv];
var logger = require('../util/logger');


//Rest calls:
//Check whether driver exist or not
var isDriverExist = function (req, userId, callback) {
    return new Promise(function (resolve, reject) {
        var get_data = JSON.stringify({});
        var options = {
            hostname: config.hostname_identity,
            port: config.port_identity,
            method: 'GET',
            path: '/users/' + userId,
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

//update driver status(isDriverAssign:(true/false))
var updateDriverStatus = function (req, userId, reqObj, callback) {
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

/**
  * export module
  */

module.exports = {
    /**
     * Controller function for get list of vehicles
     */
    getAllVehicleData: function (req) {
        return new Promise(function (resolve, reject) {

            var page = 0;
            var limit = 0;
            var sort = 'createdAt';
            var order = 'desc';
            var isAssigned = false;
            var reqObj = {};
            var asyncObject = {};
            var deviceIdArray = [];
            var driverList = [];
            var deviceList = [];

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
            if (req.query.registrationNumber) {
                reqObj.registrationNumber = req.query.registrationNumber;
            }
            if (req.query.userId) {
                reqObj.userId = req.query.userId;
            }
            if (req.query.fleetId) {
                reqObj.fleetId = req.query.fleetId;
                asyncObject.driverResult = function (callback) {
                    module.exports.getDriverList(req, req.query.fleetId, function (err, driverResult) {
                        if (err) {
                            callback(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                        } else {
                            if (driverResult.data === undefined) {
                                callback(util.responseUtil(null, null, responseConstant.DRIVER_NOT_FOUND));
                            } else {
                                callback(null, driverResult.data);
                            }
                        }
                    });
                }
            }

            if (req.query.isDriverUnassigned && req.query.isDriverUnassigned === 'true') {
                reqObj.userId = null;
            }

            if (req.query.isFleetUnassigned && req.query.isFleetUnassigned === 'true') {
                reqObj.fleetId = null;
            }
            reqObj.isDeleted = 0;
            vehicleDao.getAllVehicleData(reqObj, page, limit, sort, order).then(function (result) {
                for (var i = 0; i < result.rows.length; i++) {
                    deviceIdArray[i] = result.rows[i].dataValues.deviceId;
                }
                asyncObject.deviceResult = function (callback) {
                    deviceDao.getDeviceList(deviceIdArray).then(function (deviceResult) {
                        callback(null, deviceResult);
                    }, function (err) {
                        callback(err);
                    });
                }

                async.parallel(asyncObject, function (err, callabackResults) {
                    if (err) {
                        return reject(err);
                    } else {
                        for (var i = 0; i < result.rows.length; i++) {
                            if (callabackResults.driverResult) {
                                for (var j = 0; j < callabackResults.driverResult.length; j++) {

                                    if (result.rows[i].dataValues.userId === callabackResults.driverResult[j].id) {

                                        result.rows[i].dataValues.Driver = callabackResults.driverResult[j];
                                    }
                                }
                            }
                            if (callabackResults.deviceResult) {
                                for (var k = 0; k < callabackResults.deviceResult.length; k++) {

                                    if (result.rows[i].dataValues.deviceId === callabackResults.deviceResult[k].dataValues.id) {

                                        result.rows[i].dataValues.Device = callabackResults.deviceResult[k].dataValues;
                                    }

                                }
                            }

                        }
                    }
                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                });
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
    * Controller function for get vehicle details by id
    */
    getVehicleDetails: function (req) {
        return new Promise(function (resolve, reject) {
            var asyncObject = {};
            vehicleDao.getVehicleDetails({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                if (result.deviceId !== null) {
                    asyncObject.deviceResult = function (callback) {
                        deviceDao.getDeviceDetails({ id: result.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                            callback(null, deviceResult.dataValues);
                        }, function (err) {
                            callback(err);
                        });
                    }
                }
                if (result.fleetId !== null) {
                    asyncObject.fleetResult = function (callback) {
                        fleetDao.getFleetDetails({ id: result.fleetId, isDeleted: 0 }).then(function (fleetResult) {
                            callback(null, fleetResult.dataValues);
                        }, function (err) {
                            callback(err);
                        });
                    }
                }
                async.parallel(asyncObject, function (err, callabackResults) {
                    if (err) {
                        return reject(err);
                    } else {
                        if (callabackResults.deviceResult) {
                            result.dataValues.Device = callabackResults.deviceResult;
                        }
                        if (callabackResults.fleetResult) {
                            result.dataValues.Fleet = callabackResults.fleetResult;
                        }
                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                    }

                });
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
     * Controller function for create vehicle
     */
    insertData: function (req) {
        return new Promise(function (resolve, reject) {
            var asyncObject = {};
            var insertObj = isEmptyCheck(req.body);
            if (insertObj.userId) {
                asyncObject.driverResult = function (callback) {
                    isDriverExist(req, req.body.userId, function (err, driverResult) {
                        if (err) {
                            callback(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                        } else {
                            if (driverResult.data === undefined) {
                                callback(util.responseUtil(null, null, responseConstant.DRIVER_NOT_FOUND));
                            } else {
                                callback(null, driverResult.data);
                            }
                        }
                    });
                }

                async.parallel(asyncObject, function (err, results) {
                    if (err) {
                        return reject(err);
                    } else {
                        if (results.driverResult) {
                            if (results.driverResult.Tenant.id !== req.params.tenantId) {
                                return reject(util.responseUtil(null, null, responseConstant.DRIVER_NOT_BELONGTO_TENANT));
                            } else {
                                vehicleDao.isUserAssignToVehicle({ userId: insertObj.userId, isDeleted: 0 }).then(function (result) {
                                    vehicleDao.insertData(insertObj).then(function (result) {
                                        if (result.deviceId != null) {
                                            deviceDao.updateData({ isDeviceAssign: 1 }, { id: result.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                                                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                            }, function (err) {
                                                return reject(err);
                                            });
                                        }
                                        if (result.userId != null) {
                                            var obj = {};
                                            obj.isDriverAssign = 1;
                                            updateDriverStatus(req, result.userId, obj, function (err, driverUpdateResult) {
                                                if (err) {
                                                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                                } else {
                                                    return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                                }

                                            });
                                        }
                                        else {
                                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                                        }
                                    }, function (err) {
                                        return reject(err);

                                    });

                                }, function (err) {
                                    return reject(err);
                                })
                            }
                        }
                    }
                });

            } else {
                vehicleDao.insertData(insertObj).then(function (result) {
                    if (result.deviceId != null) {
                        deviceDao.updateData({ isDeviceAssign: 1 }, { id: result.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);
                        });
                    } else {
                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                    }

                }, function (err) {
                    return reject(err);

                })
            }
        })
    },


    /**
     * Controller function for Update vehicle
     */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = isEmptyCheck(req.body);
            updateObj.updatedAt = new Date();
            vehicleDao.getVehicleDetails({ id: req.params.id, isDeleted: 0 }).then(function (vehicleResult) {
                if (vehicleResult.userId != null && !empty(req.body.userId)) {
                    return reject(util.responseUtil(null, null, responseConstant.USER_EXIST));
                }
                if (updateObj.userId) {
                    vehicleDao.isUserAssignToVehicle({ userId: updateObj.userId, isDeleted: 0 }).then(function (result) {
                        vehicleDao.updateData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                            if (updateObj.deviceId) {
                                deviceDao.updateData({ isDeviceAssign: 1 }, { id: updateObj.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                                    logger.info("Update device status");
                                }, function (err) {
                                    return reject(err);
                                });
                            }
                            if (updateObj.userId) {
                                var obj = {};
                                obj.isDriverAssign = 1;
                                obj.fleetId = result.fleetId;
                                updateDriverStatus(req, result.userId, obj, function (err, driverUpdateResult) {
                                    if (err) {
                                        return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                    }
                                    else {
                                        logger.info("Updated driver status");
                                    }
                                });
                            }
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);
                        });

                    }, function (err) {
                        return reject(err);
                    })
                }
                else {
                    vehicleDao.updateData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                        if (updateObj.deviceId) {
                            deviceDao.updateData({ isDeviceAssign: 1 }, { id: updateObj.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                                logger.info("Update device status");
                            }, function (err) {
                                return reject(err);
                            });
                        }

                        if (req.body.isRemoveDriver === true) {
                            var obj = {};
                            obj.isDriverAssign = 0;
                            updateDriverStatus(req, vehicleResult.userId, obj, function (err, driverUpdateResult) {
                                if (err) {
                                    return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                                }
                                else {
                                    logger.info("Updated driver status");
                                }
                            });
                        }
                        return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));

                    }, function (err) {
                        return reject(err);
                    });
                }
            }, function (err) {
                return reject(err);
            });
        });
    },



    /**
      * Controller function for delete vehicle
      */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = {};
            updateObj.updatedAt = new Date();
            updateObj.isDeleted = 1;

            vehicleDao.getVehicleDetails({ id: req.params.id, isDeleted: 0 }).then(function (getVehicleResult) {

                vehicleDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                    if (getVehicleResult.dataValues.deviceId) {
                        deviceDao.updateData({ isDeviceAssign: 0 }, { id: getVehicleResult.dataValues.deviceId, isDeleted: 0 }).then(function (deviceResult) {
                            logger.info("Update device status");
                        }, function (err) {
                            return reject(err);
                        });
                    }
                    if (getVehicleResult.dataValues.userId) {
                        var obj = {};
                        obj.isDriverAssign = 0;
                        updateDriverStatus(req, getVehicleResult.dataValues.userId, obj, function (err, driverUpdateResult) {
                            if (err) {
                                return reject(util.responseUtil(null, null, responseConstant.RUN_TIME_ERROR));
                            } else {
                                logger.info("Updated driver status");
                            }

                        });
                    }
                    return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                }, function (err) {
                    return reject(err);
                });
            }, function (err) {
                return reject(err);
            });
        });
    },

    /**
       Rest call
       Get list of drivers
         */
    getDriverList: function (req, fleetId, callback) {
        return new Promise(function (resolve, reject) {
            var get_data = JSON.stringify({});
            var options = {
                hostname: config.hostname_identity,
                port: config.port_identity,
                method: 'GET',
                path: '/users?' + 'fleetId=' + fleetId,
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

}
/**
Function for empty check
 */
function isEmptyCheck(body) {
    var insertObj = {};
    if (!empty(body.brandName)) {
        insertObj.brandName = body.brandName;
    }
    if (!empty(body.model)) {
        insertObj.model = body.model;
    }
    if (!empty(body.fuelType)) {
        insertObj.fuelType = body.fuelType;
    }
    if (!empty(body.registrationNumber)) {
        insertObj.registrationNumber = body.registrationNumber;
    }
    if (!empty(body.userId)) {
        insertObj.userId = body.userId;
    }
    if (!empty(body.deviceId)) {
        insertObj.deviceId = body.deviceId;
    }
    if (!empty(body.fleetId)) {
        insertObj.fleetId = body.fleetId;
    }
    if (!empty(body.yearOfManufacture)) {
        insertObj.yearOfManufacture = body.yearOfManufacture;
    }
    if (!empty(body.geoFencing)) {
        insertObj.geoFencing = body.geoFencing;
    }
    if (!empty(body.color)) {
        insertObj.color = body.color;
    }
    if (body.isRemoveDriver && body.isRemoveDriver === true) {
        insertObj.userId = null;
    }
    return insertObj;
}