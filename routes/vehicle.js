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
var service = require('../src/service/vehicle-service');
var responseConstant = require("../src/constant/responseConstant");
var constants = require("../src/constant/constants");
var util = require('../src/util/commonUtil');
var empty = require('is-empty');
var auth = require('../src/config/authentication');


//create vehicle api
/**
 * @api {post} /:tenantId/vehicles Create Vehicle 
 * @apiVersion 1.0.0
 * @apiName CreateVehicle
 * @apiGroup Vehicle
 *
 * @apiDescription Create Vehicle. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"brandName": "MS Brezza","model":"Maruti Suzuki Vitara Brezza","fuelType":"petrol","yearOfManufacture":"2012","geoFencing":"geofence1","registrationNumber":"1GNEK13ZX3R298984","userId":"00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6","deviceId":"bc313a62-fdf9-4e66-8c22-a84c91f60aa4","fleetId":"6d3a5cd4-6a0b-4828-b71d-f43100d68bb3"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} brandName Brand Name.
 * @apiParam {String} model Model Name.
 * @apiParam {String} fuelType  Fuel Type.
 * @apiParam {String} yearOfManufacture Year of Manufacture.
 * @apiParam {String} registrationNumber Vehicle Registration Number
 * @apiParam {String} color Vehicle's color.(optional)
 * @apiParam {String} geoFencing Geofencing(optional)
 * @apiParam {UUID} userId User Id.(optional)
 * @apiParam {UUID} deviceId Device Id.(optional)
 * @apiParam {UUID} fleetId Fleet Id.(optional)
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	        "brandName": "MS Brezza",
 *           "model": "Maruti Suzuki Vitara Brezza",
 *           "fuelType": "Four Wheeler",
 *           "registrationNumber": "1GNEK13ZX3R298984",
 *           "userId": "00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6",
 *           "deviceId": "bc313a62-fdf9-4e66-8c22-a84c91f60aa4"
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
 
 * @apiSuccess {String} brandName Vehicle Name.
 * @apiSuccess {String} model Model Name.
 * @apiSuccess {String} fuleType Fuel Type.
 * @apiSuccess {String} registrationNumber Vehicle Registration Number.
 * @apiSuccess {String} color Vehicle's color.
 * @apiSuccess {String} yearOfManufacture Year of Manufacture.
 * @apiSuccess {String} userId User Id.
 * @apiSuccess {String} deviceId DeviceId.
 * @apiSuccess {String} fleetId FleetId.

 
 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *{
    "message": "Success",
    "data": {
        "id": "3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897",
        "isDeleted": 0,
        "status": "Active",
        "brandeName": "test vehicle",
        "model": "model-brezza",
        "fuelType": "petrol",
        "registrationNumber": "09809876543219876",
        "userId": "b55e75da-595a-4303-b6f6-889e4f41afca",
        "deviceId": "b55e75da-595a-4303-b6f6-889e4f41afca",
        "fleetId": "b55e75da-595a-4303-b6f6-889e4f41afca",
        "updatedAt": "2018-03-07T08:26:14.441Z",
        "createdAt": "2018-03-07T08:26:14.441Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles
 *
 */
router.post('/:tenantId/vehicles', function (req, res) {
    req.sanitizeBody('brandName').trim();
    req.sanitizeBody('model').trim();
    req.sanitizeBody('fuelType').trim();
    req.sanitizeBody('registrationNumber').trim();
    req.sanitizeBody('userId').trim();
    req.sanitizeBody('deviceId').trim();
    req.sanitizeBody('fleetId').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId ').isUUID();

    req.checkBody('brandName', 'BrandName can not be null.').notEmpty();
    req.checkBody('brandName', 'Invalid brandName.').isLength(3, 20);
    req.checkBody('registrationNumber', 'RegistrationNumber can not be null.').notEmpty();
    if (!empty(req.body.userId)) {
        req.checkBody('userId', 'Invalid userId ').optional().isUUID();
    }
    if (!empty(req.body.deviceId)) {
        req.checkBody('deviceId', 'Invalid deviceid ').isUUID();
    }
    if (!empty(req.body.fleetId)) {
        req.checkBody('fleetId', 'Invalid fleetId ').isUUID();
    }
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
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

/*
/**
 * @api {get} /:tenantId/vehicles/:id Get Vehicle's Details
 * @apiVersion 1.0.0
 * @apiName Get Vehicle's Details
 * @apiGroup Vehicle
 *
 * @apiDescription Get Vehicle's Details. 
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/0e5e148f-82fc-4e0d-a8a2-524af36826d2 -H "Autherization:<access-token>" -H "Content-Type: application/json"
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
 * 
 * @apiSuccess {String} brandName Vehicle Name.
 * @apiSuccess {String} model Model Name.
 * @apiSuccess {String} fuleType Fuel Type.
 * @apiSuccess {String} registrationNumber Vehicle Registration Number
 * @apiSuccess {String} yearOfManufacture Year of Manufacture.
 * @apiSuccess {String} userId User Id.
 * @apiSuccess {String} deviceId DeviceId.
 * @apiSuccess {String} fleetId FleetId.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
{
    "message": "Success",
    "data": {
        "id": "351b5b70-2941-4eb7-8294-01b4d6a70a0f",
        "brandName": "Audi",
        "model": "Q7",
        "fuelType": "Petrol",
        "registrationNumber": "MH12MG5464",
        "geoFencing": null,
        "yearOfManufacture": "2018",
        "color": "White",
        "userId": "47e76a6c-6efe-4569-b525-1c4dc0508c2f",
        "deviceId": "7351c2ec-539f-4406-a019-1f4ad3677548",
        "fleetId": null,
        "isDeleted": 0,
        "status": "Active",
        "createdAt": "2018-03-26T07:00:23.671Z",
        "updatedAt": "2018-03-29T09:37:53.399Z",
        "Device": {
            "id": "7351c2ec-539f-4406-a019-1f4ad3677548",
            "deviceName": "device",
            "serialNo": "SN101",
            "protocolVersion": "v1.01",
            "deviceType": "obd",
            "description": "test",
            "updatedAt": "2018-03-29T09:35:37.504Z",
            "createdAt": "2018-03-29T09:35:37.504Z",
            "isDeleted": 0,
            "status": "Active",
            "hardwareVersion": "0.1"
        }
    }
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897
 *
 */
router.get('/:tenantId/vehicles/:id', function (req, res) {

    req.checkParams('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();
    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getVehicleDetails(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Get All Vehicle Api
/**
 * @api {get} /:tenantId/vehicles Get All Vehicle List
 * @apiVersion 1.0.0
 * @apiName GetvehicleList
 * @apiGroup Vehicle
 *
 * @apiDescription vehicle List. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {Number} page[page=0]  Page Number (optional).
 * @apiParam {Number} limit[limit=0]  List limit(optional).
 * @apiParam {String} sort[sort=createdAt]  Sorting on which field(optional).
 * @apiParam {String} order[order=asc]  Sorting field order(asc|desc)(optional).
 * @apiParam {String} registrationNumber RegistrationNumber Sorting field registrationNumber(optional).
 * @apiParam {String} userId UserId Sorting field (optional).
 * @apiParam {String} fleetId FleetId Sorting field (optional).
 * @apiParam {Boolean} isDriverUnassigned Flag to get all unassigned vehicle(optional).
 * @apiParam {Boolean} isFleetUnassigned Flag to get all unassigned vehicle(optional).
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
 * @apiSuccess {String} brandName Vehicle Name.
 * @apiSuccess {String} model Model Name.
 * @apiSuccess {String} fuleType Fuel Type.
 * @apiSuccess {String} registrationNumber Vehicle Registration Number
 * @apiSuccess {String} yearOfManufacture Year of Manufacture.
 * @apiSuccess {String} userId User Id.
 * @apiSuccess {String} deviceId Device Id.
 * @apiSuccess {String} fleetId Fleet Id.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 {
    "message": "Success",
    "count": 2,
    "data": [
        {
            "id": "db15fd42-a45c-4a80-9186-cc6473d75c6e",
            "brandeName": "test vehicle1",
            "model": "model-swift",
            "fuelType": "petrol",
            "registrationNumber": "09809876543219874",
            "userId": "b55e75da-595a-4303-b6f6-889e4f41afca",
            "deviceId": "b55e75da-595a-4303-b6f6-889e4f41afca",
            "isDeleted": 0,
            "status": "Active",
            "createdAt": "2018-03-07T08:52:28.967Z",
            "updatedAt": "2018-03-07T08:52:28.967Z"
        },
        {
            "id": "3f6b39e8-24e1-4d2e-a1ac-e5fd76ed5897",
            "brandeName": "test vehicle",
            "model": "model-brezza",
            "fuelType": "vmake",
            "registrationNumber": "09809876543219876",
            "userId": "b55e75da-595a-4303-b6f6-889e4f41afca",
            "deviceId": "b55e75da-595a-4303-b6f6-889e4f41afca",
            "isDeleted": 0,
            "status": "Active",
            "createdAt": "2018-03-07T08:26:14.441Z",
            "updatedAt": "2018-03-07T08:26:14.441Z"
        }
    ]
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles
 *
 */
router.get('/:tenantId/vehicles', function (req, res) {
    req.sanitizeBody('limit').trim();
    req.sanitizeBody('page').trim();
    req.sanitizeBody('sort').trim();
    req.sanitizeBody('order').trim();

    req.checkParams('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();

    if (!empty(req.query.limit)) {
        req.checkQuery('limit', 'Invalid limit parameter').optional().isInt();
    }
    if (!empty(req.query.page)) {
        req.checkQuery('page', 'Invalid page parameter').optional().isInt();
    }
    if (!empty(req.query.sort)) {
        req.checkQuery('sort', 'Invalid sort parameter').optional().isIn(constants.vehicleSortFields);
    }
    if (!empty(req.query.order)) {
        req.checkQuery('order', 'Invalid order parameter').optional().isIn(constants.order);
    }
    if (!empty(req.query.isDriverUnassigned)) {
        req.checkQuery('isDriverUnassigned', 'Invalid isDriverUnassigned flag').optional().isIn(['true', 'false']);
    }
    if (!empty(req.query.userId)) {
        req.checkQuery('userId', 'Invalid userId').optional().isUUID();
    }
    if (!empty(req.query.fleetId)) {
        req.checkQuery('fleetId', 'Invalid fleetId').optional().isUUID();
    }
    if (!empty(req.query.isFleetUnassigned)) {
        req.checkQuery('isFleetUnassigned', 'Invalid isFleetUnassigned flag').optional().isIn(['true', 'false']);
    }
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getAllVehicleData(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

//Update Vehicle Api
/**
 * @api {put} /:tenantId/vehicles/:id Update Vehicle 
 * @apiVersion 1.0.0
 * @apiName UpdateVehicle
 * @apiGroup Vehicle
 *
 * @apiDescription Update Vehicle. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X PUT  --data '{"brandName": "Updated vehicle"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/5a2a8b63a4894865d03600a7
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
* @apiParam {String} [brandName=null]  Brand Name(optional).
 * @apiParam {String} [model=null]  Model Name(optional).
 * @apiParam {String} [type=null]  FuelType Type(optional).
 * @apiParam {String} [regitsrationNumber=null]  Vehicle Registration Number(optional).
 * @apiParam {String} [userId=null]  User Id(optional).
 * @apiParam {String} [deviceId=null]  Device Id(optional).
 * @apiParam {String} [fleetId=null]  Fleet Id(optional).
 *
 * @apiParamExample {json} Request-Example:
 *     	{
 *	        "model": "swift"
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
 * 
 * @apiSuccess {String} brandName Vehicle Name.
 * @apiSuccess {String} model Model Name.
 * @apiSuccess {String} fuelType Fuel Type.
 * @apiSuccess {String} registrationNumber Vehicle Registartion Number
 * @apiSuccess {String} userId User Id.
 * @apiSuccess {String} deviceId Device Id.
 * @apiSuccessExample {json} Success-Response:
 * {
    "message": "Success",
    "data": {
        "model": "swift",
        "updatedAt": "2018-02-27T11:03:40.144Z"
    }
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.put('/:tenantId/vehicles/:id', function (req, res) {
    req.sanitize('brandName').trim();
    req.sanitize('model').trim();
    req.sanitize('fuelType').trim();
    req.sanitize('registrationNumber').trim();
    req.sanitize('userId').trim();
    req.sanitize('deviceId').trim();

    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();

    req.checkParams('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();

    if (!empty(req.body.brandName)) {
        req.checkBody('brandName', 'Invalid brandName.').isLength(3, 20);
    }

    if (!empty(req.body.userId)) {
        req.checkBody('userId', 'Invalid userId ').isUUID();
    }
    if (!empty(req.body.deviceId)) {
        req.checkBody('deviceId', 'Invalid deviceId ').isUUID();
    }

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
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

//Delete Vehicle Api
/**
 * @api {delete} /:tenantId/vehicles/:id Delete Vehicle 
 * @apiVersion 1.0.0
 * @apiName DeleteVehicle
 * @apiGroup Vehicle
 *
 * @apiDescription Delete Vehicle. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/devices/4aedcab5-9413-4219-b09f-e652df7be3b6
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
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/vehicles/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.delete('/:tenantId/vehicles/:id', function (req, res) {
    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();

    req.checkParams('tenantId', 'TenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();


    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALID_REQUEST_PARAMETERS));
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
