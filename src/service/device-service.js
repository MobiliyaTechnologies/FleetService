'use strict';
/**
 *  This module is use to define service for device  model 
 *  @module fleetController
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 *  import project module
 */
var util = require("../util/commonUtil");
var deviceDao = require("../dao/device-dao");
var responseConstant = require("../constant/responseConstant");
var empty = require('is-empty');


/**
  * export module
  */

module.exports = {
    /**
     * Controller function for get list of device
     */
    getAllDeviceData: function (req) {
        return new Promise(function (resolve, reject) {

            var page = 0;
            var limit = 0;
            var sort = 'createdAt';
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

            if (req.query.isDeviceAssign) {
                reqObj.isDeviceAssign = req.query.isDeviceAssign;
            }
            reqObj.isDeleted = 0;
            deviceDao.getAllDeviceData(reqObj, page, limit, sort, order).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
   * Controller function for get device details by id
   */
    getDeviceDetails: function (req) {
        return new Promise(function (resolve, reject) {
            deviceDao.getDeviceDetails({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
     * Controller function for create device
     */
    insertData: function (req) {
        return new Promise(function (resolve, reject) {
            util.createDeviceOnIOTHub(req.body.deviceName, function (err, deviceInfo) {
                if (err) {
                    return reject(util.responseUtil(null, null, responseConstant.DEVICE_CREATION_ERROR));
                } else {
                    try {
                        var insertObj = isEmptyCheck(req.body);
                        deviceDao.insertData(insertObj).then(function (result) {
                            return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
                        }, function (err) {
                            return reject(err);

                        })
                    }
                    catch (err) {
                        return reject(util.responseUtil(null, null, responseConstant.DEVICE_CREATION_ERROR));
                    }
                }
            });

        })
    },


    /**
     * Controller function for update device
     */
    updateData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = isEmptyCheck(req.body);
            updateObj.updatedAt = new Date();
            deviceDao.updateData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                return resolve(util.responseUtil(null, result, responseConstant.SUCCESS));
            }, function (err) {
                return reject(err);
            });
        });
    },


    /**
      * Controller function for delete device
      */
    deleteData: function (req) {
        return new Promise(function (resolve, reject) {
            var updateObj = {};
            updateObj.updatedAt = new Date();
            updateObj.isDeleted = 1;
            deviceDao.getDeviceDetails({ id: req.params.id, isDeleted: 0 }).then(function (result) {
                if (result.dataValues.isDeviceAssign === 0) {
                    util.removeDeviceFromIOTHub(result.deviceName, function (err, res) {
                        if (err) {
                            return reject(util.responseUtil(null, null, responseConstant.INVALIDE_DEVICE));
                        } else {

                            deviceDao.deleteData(updateObj, { id: req.params.id, isDeleted: 0 }).then(function (result) {
                                return resolve(util.responseUtil(null, null, responseConstant.SUCCESS));
                            }, function (err) {
                                return reject(err);
                            });
                        }
                    });
                } else {
                    return reject(util.responseUtil(null, null, responseConstant.DEVICE_DELETION_ERROR));
                }
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
    if (!empty(body.deviceName)) {
        insertObj.deviceName = body.deviceName;
    }
    if (!empty(body.serialNo)) {
        insertObj.serialNo = body.serialNo;
    }
    if (!empty(body.lastConnectedTime)) {
        insertObj.lastConnectedTime = body.lastConnectedTime;
    }
    if (!empty(body.VIN)) {
        insertObj.VIN = body.VIN;
    }
    if (!empty(body.protocolVersion)) {
        insertObj.protocolVersion = body.protocolVersion;
    }
    if (!empty(body.deviceType)) {
        insertObj.deviceType = body.deviceType;
    }
    if (!empty(body.description)) {
        insertObj.description = body.description;
    }
    if (!empty(body.hardwareVersion)) {
        insertObj.hardwareVersion = body.hardwareVersion;
    }
    return insertObj;
}