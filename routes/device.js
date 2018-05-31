'use strict';
/**
 *  This module is use to define routes 
 *  @module fleetRoutes
 *  @author shweta.ghenand
 *  @version 1.0.0
 */
var express = require('express');
var HttpStatus = require('http-status-codes');

var router = express.Router();
var service = require('../src/service/device-service');
var responseConstant = require("../src/constant/responseConstant");
var constants = require("../src/constant/constants");
var util = require('../src/util/commonUtil');
var empty = require('is-empty');
var auth = require('../src/config/authentication');


//create device api
/**
 * @api {post} /:tenantId/devices Create Device
 * @apiVersion 1.0.0
 * @apiName CreateDevice
 * @apiGroup Device
 *
 * @apiDescription Create Device. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"deviceName": "device1","serialNo":"SN101","description":"test device","lastConnectedTime":"2018-01-08 11:13:29.000","protocolVersion":"v1.01","deviceType":"J1939"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} deviceName Device Name.
 * @apiParam {String} serialNo Serial Number.
 * @apiParam {Object} description Device description.(optional)
 * @apiParam {Date} lastConnectedTime  Last connected Timestamp 
 * @apiParam {String} protocolVersion Protocol Version supported
 * @apiParam {String} deviceType DeviceType.
 * @apiParam {String} hardwareVersion Hardware version of device.
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	        "deviceName": "device1",
 *           "serialNo": "SN101",
 *           "description": "test device",
 *           "lastConnectedTime": "2018-01-08 11:13:29.000",
 *           "protocolVersion": "v1.01",
 *           "deviceType": "J1939"
 * 
 *       }
 *
 *
 * @apiError Unauthorized The token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 *
 * @apiError BadRequest Invalid request parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 BadRequest
 *     {
 *        "message": "Bad Request"
 *     }
 * 
 
 * @apiSuccess {String} deviceName Device Name.
 * @apiSuccess {String} serialNo Serial Number.
 * @apiSuccess {Object} description Device description.
 * @apiSuccess {Date} lastConnectedTime  Last connected Timestamp 
 * @apiSuccess {String} protocolVersion Protocol Version supported
 * @apiSuccess {String} deviceType DeviceType.
 * @apiSuccess {String} hardwareVersion Hardware version of device
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Success",
    "data": {
        "id": "372993ba-a6a0-4164-b9c3-3cf5c6844374",
        "isDeleted": 0,
        "status": "Active",
        "deviceName": "device1",
        "serialNo": "sn101",
        "lastConnectedTime": "2018-03-03T08:02:43.833Z",
        "protocolVersion": "v1.01",
        "deviceType": "OBD",
        "description": "test device",
        "updatedAt": "2018-03-07T08:03:23.557Z",
        "createdAt": "2018-03-07T08:03:23.557Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices
 *
 */
router.post('/:tenantId/devices', function (req, res) {

    req.sanitizeBody('deviceName').trim();
    req.sanitizeBody('serialNo').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();
    req.checkBody('deviceName', 'DeviceName can not be null.').notEmpty();
    req.checkBody('deviceName', 'Invalid deviceName.').isLength(3, 20);
    req.checkBody('serialNo', 'SerialNo can not be null.').notEmpty();
    req.checkBody('serialNo', 'Invalid serialNo.').isLength(3, 20);
    req.checkBody('protocolVersion', 'ProtocolVersion can not be null').notEmpty();
    req.checkBody('deviceType', 'DeviceType can not be null').notEmpty();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.insertData(req).then(function (result) {
                res.status(HttpStatus.CREATED).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});



/**
 * @api {get} /:tenantId/devices/:id Get Device's Details
 * @apiVersion 1.0.0
 * @apiName Get Device's Details
 * @apiGroup Device
 *
 * @apiDescription Get Device's Details. 
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/e9f2841b-e15f-4acb-85af-ff7b99089f77-H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiError BadRequest  Invalid request data.
 * @apiErrorExample Response (400 example):
 *     HTTP/1.1 400 Bad Request
 *     {
 *         "message": "Bad Request"
 *         "error": {
 *               "id": {
 *                   "location": "params",
 *                   "param": "id",
 *                   "msg": "Invalid"
 *               }
 *           }
 *     }
 *
 * @apiError Unauthorized The  token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     } 
 * 
 * @apiSuccess {String} deviceName Device Name.
 * @apiSuccess {String} serialNo Serial Number.
 * @apiSuccess {Object} description Device description.
 * @apiSuccess {Date} lastConnectedTime  Last connected Timestamp 
 * @apiSuccess {String} protocolVersion Protocol Version supported
 * @apiSuccess {String} deviceType DeviceType.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Success",
    "data": {
        "id": "372993ba-a6a0-4164-b9c3-3cf5c6844374",
        "deviceName": "device1",
        "description": "test device",
        "serialNo": "sn101",
        "protocolVersion": "v1.01",
        "deviceType": "OBD",
        "lastConnectedTime": "2018-03-03T08:02:43.833Z",
        "isDeleted": 0,
        "status": "Active",
        "createdAt": "2018-03-07T08:03:23.557Z",
        "updatedAt": "2018-03-07T08:03:23.557Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/372993ba-a6a0-4164-b9c3-3cf5c6844374
 *
 */
router.get('/:tenantId/devices/:id', function (req, res) {
    req.checkParams('id', 'DeviceId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid DeviceId').isUUID();
    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getDeviceDetails(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get All Device Api
/**
 * @api {get} /:tenantId/devices Get All Device List
 * @apiVersion 1.0.0
 * @apiName GetdeviceList
 * @apiGroup Device
 *
 * @apiDescription device List. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {Number} page[page=0] Page Number (optional).
 * @apiParam {Number} limit[limit=0]  List limit(optional).
 * @apiParam {String} sort[sort=createdAt]  Sorting on which field(optional).
 * @apiParam {String} order[order=asc]  Sorting field order(asc|desc)(optional).
 * @apiParam {Boolean} [isDeviceAssign]  Get list of device(assign/unassign) (1|0)(optional)
 *
 * @apiError Unauthorized The token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 *
 * @apiError BadRequest Invalide request parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "BadRequest"
 *     }
 * @apiSuccess {String} deviceName Device Name.
 * @apiSuccess {String} serialNo Serial Number.
 * @apiSuccess {Object} description Device description.
 * @apiSuccess {Date} lastConnectedTime  Last connected Timestamp 
 * @apiSuccess {String} protocolVersion Protocol Version supported
 * @apiSuccess {String} deviceType DeviceType.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Success",
    "count": 2,
    "data": [
        {
            "id": "33629ecb-f239-4521-9a6e-ce9ea27b2381",
            "deviceName": "device",
            "description": null,
            "serialNo": "sn101",
            "protocolVersion": "v1.01",
            "deviceType": "obd",
            "lastConnectedTime": null,
            "isDeleted": 0,
            "status": "Active",
            "createdAt": "2018-03-07T08:02:43.833Z",
            "updatedAt": "2018-03-07T08:02:43.833Z"
        },
        {
            "id": "372993ba-a6a0-4164-b9c3-3cf5c6844374",
            "deviceName": "device1",
            "description": "test device",
            "serialNo": "sn101",
            "protocolVersion": "v1.01",
            "deviceType": "OBD",
            "lastConnectedTime": "2018-03-03T08:02:43.833Z",
            "isDeleted": 0,
            "status": "Active",
            "createdAt": "2018-03-07T08:03:23.557Z",
            "updatedAt": "2018-03-07T08:03:23.557Z"
        }
    ]
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices
 *
 */
router.get('/:tenantId/devices', function (req, res) {
    req.sanitizeBody('limit').trim();
    req.sanitizeBody('page').trim();
    req.sanitizeBody('sort').trim();
    req.sanitizeBody('order').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();

    if (!empty(req.query.limit)) {
        req.checkQuery('limit', 'Invalid limit parameter').optional().isInt();
    }
    if (!empty(req.query.page)) {
        req.checkQuery('page', 'Invalid page parameter').optional().isInt();
    }
    if (!empty(req.query.sort)) {
        req.checkQuery('sort', 'Invalid sort parameter').optional().isIn(constants.deviceSortFields);
    }
    if (!empty(req.query.order)) {
        req.checkQuery('order', 'Invalid order parameter').optional().isIn(constants.order);
    }
    if (!empty(req.query.isDeviceAssign)) {
        req.checkQuery('isDeviceAssign', 'Invalid isDeviceAssign').optional().isIn([0, 1]);
    }
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getAllDeviceData(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});
//Update Device Api
/**
 * @api {put} /:tenantId/devices/:id Update Device 
 * @apiVersion 1.0.0
 * @apiName UpdateDevice
 * @apiGroup Device
 *
 * @apiDescription Update Device. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X PUT  --data '{"deviceName": "Updated device","description":"updated device information",lastConnectedTime":"2018-02-27T11:45:17.403Z","protocolVersion":"v1.01"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
* 
 * @apiParam {String} [description=null] Device description(optional).
 * @apiParam {String} [lastConnectedTime=null] LastConnectedTime(optional).
 * @apiParam {String} [protocolVersion=null]  ProtocolVersion(optional).
 *
 *
 * @apiParamExample {json} Request-Example:
 *     	{
 *	        "deviceName": "updated device"
 *       }
 *
 *
 * @apiError Unauthorized The token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 *
 * @apiError BadRequest Invalide request parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "Bad Request"
 *     } 

 * @apiSuccess {Object}  Device description.
 * @apiSuccess {Date}   Last connected Timestamp 
 * @apiSuccess {String}  Protocol Version supported

 * @apiSuccessExample {json} Success-Response:
 * {
    "message": "Success",
    "data": {
        "deviceName": "updated device",
        "updatedAt": "2018-02-27T11:03:40.144Z"
    }
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.put('/:tenantId/devices/:id', function (req, res) {
    req.sanitize('deviceName').trim();
    req.sanitize('lastConnectedTime').trim();
    req.sanitize('protocolVersion').trim();

    req.checkParams('id', 'DeviceId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid deviceId').isUUID();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.updateData(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Delete Device Api
/**
 * @api {delete} /:tenantId/devices/:id Delete Device 
 * @apiVersion 1.0.0
 * @apiName DeleteDevice
 * @apiGroup Device
 *
 * @apiDescription Delete Device. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiError Unauthorized The token was invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *        "message": "Unauthorized."
 *     }
 *
 * @apiError InternalServerError The Internal Server Error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "message": "InternalServerError"
 *     }
 *
 * @apiError BadRequest Invalide request parameters.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "message": "Bad Request"
 *     } 
 * 
 * @apiSuccess {String} message Message.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/devices/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.delete('/:tenantId/devices/:id', function (req, res) {
    req.checkParams('id', 'DeviceId can not be empty').notEmpty();
    req.checkParams('id', 'Invalid deviceId').isUUID();

    req.checkParams('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.deleteData(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

module.exports = router;
