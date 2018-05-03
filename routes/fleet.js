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
var service = require('../src/service/fleet-service');
var responseConstant = require("../src/constant/responseConstant");
var constants = require("../src/constant/constants");
var util = require('../src/util/commonUtil');
var empty = require('is-empty');
var auth = require('../src/config/authentication');


//create fleet api
/**
 * @api {post}  /:tenantId/fleets Create Fleet 
 * @apiVersion 1.0.0
 * @apiName CreateFleet
 * @apiGroup Fleet
 *
 * @apiDescription Create Fleet. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X POST  --data '{"fleetName": "test","description": "test description","fleetAdminId":"bc313a62-fdf9-4e66-8c22-a84c91f60aa4"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiParam {String} fleetName Fleet Name.
 * @apiParam {String} description Description.(optional)
 * @apiParam {String} fleetAdminId FleetAdmin Id.
 * @apiParam {UUID[]} vehicleIdList Assign fleetId to multiple vehicles.
 *
 * @apiParamExample {json} Request-Example:
 *    	{
 *	        "fleetName": " demo",
 *           "description": " demo fleet",
 *           "fleetAdminId": "bc313a62-fdf9-4e66-8c22-a84c91f60aa4",
 *            "vehicleIdList": ["699a006c-b21c-4934-9cff-35d01b3f40af"]
 *   
 *       }
 *
 *
 * @apiError Unauthorized The Fleet token was invalid.
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
 * @apiSuccess {String} fleetName  Fleet Name.
 * @apiSuccess {String} description Fleet Description.
 * @apiSuccess {String} tenantId TenantId.
 * @apiSuccess  {String} fleetAdminId FleetAdmin Id.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "message": "Success",
    "data": {
        "id": "2e272995-d96c-4b6e-8da6-9a5060a6c97f",
        "isDeleted": 0,
        "status": "Active",
        "fleetName": " demo",
        "description": " demo fleet",
        "fleetAdminId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
        "tenantId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
        "updatedAt": "2018-03-07T06:13:07.695Z",
        "createdAt": "2018-03-07T06:13:07.695Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets
 *
 */
router.post('/:tenantId/fleets', function (req, res) {
    req.sanitizeBody('fleetName').trim();
    req.sanitizeBody('fleetAdminId').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();
    req.checkBody('fleetName', 'fleetName can not be null.').notEmpty();
    req.checkBody('fleetName', 'Invalid fleetName.').isLength(3, 20);
    req.checkBody('fleetAdminId', 'fleetAdminId can not be null').notEmpty();
    req.checkBody('fleetAdminId', 'Invalid fleetAdminId ').isUUID();
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

/*
/**
 * @api {get} /:tenantId/fleets/:id Get Fleet's Details
 * @apiVersion 1.0.0
 * @apiName Get Fleet's Details
 * @apiGroup Fleet
 *
 * @apiDescription Get Fleet's Details. 
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/c678ec68-2c65-4ced-bdb6-0e34d9c245aa -H "Autherization:<access-token>" -H "Content-Type: application/json"
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
 * @apiError Unauthorized The Fleet token was invalid.
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
 * @apiSuccess {String} fleetName Fleet Name.
 * @apiSuccess {String} description Description.
 * @apiSuccess {String} tenantId TenantId.
 * @apiSuccess  {String} fleetAdminId FleetAdmin Id.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "message": "Success",
    "data": {
        "id": "2e272995-d96c-4b6e-8da6-9a5060a6c97f",
        "isDeleted": 0,
        "status": "Active",
        "fleetName": " demo",
        "description": " demo fleet",
        "fleetAdminId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
        "tenantId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
        "updatedAt": "2018-03-07T06:13:07.695Z",
        "createdAt": "2018-03-07T06:13:07.695Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets/2e272995-d96c-4b6e-8da6-9a5060a6c97f
 *
 */
router.get('/:tenantId/fleets/:id', function (req, res) {
    req.checkParams('tenantId', 'tenantId can not be empty').notEmpty();
    req.checkParams('tenantId', 'Invalid tenantId').isUUID();

    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();
    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getFleetDetails(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});

//Get All Fleet Api
/**
 * @api {get} /:tenantId/fleets Get All Fleet List
 * @apiVersion 1.0.0
 * @apiName GetFleetList
 * @apiGroup Fleet
 *
 * @apiDescription Fleet List. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X GET  -d "" http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets -H "Autherization:<access-token>" -H "Content-Type: application/json"
 *
 * @apiParam {Number} page[page=0]  Page Number (optional).
 * @apiParam {Number} limit[limit=0]  List limit(optional).
 * @apiParam {String} sort[sort=createdAt]  Sorting on which field(optional).
 * @apiParam {String} order[order=asc]  Sorting field order(asc|desc)(optional).
 * @apiParam {String} fleetAdminId[order=asc] fleetAdminId Sorting field (optional).
 *
 * @apiError Unauthorized The Fleet token was invalid.
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
 * @apiSuccess {String} fleetName Fleet Name.
 * @apiSuccess {String} description Description.
 * @apiSuccess {String} tenantId TenantId.
 * @apiSuccess  {String} fleetAdminId FleetAdmin Id.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
    "message": "Success",
    "count": 1,
    "data": [
         {
            "id": "2e272995-d96c-4b6e-8da6-9a5060a6c97f",
            "fleetName": " demo",
            "description": " demo fleet",
            "tenantId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
            "fleetAdminId": "bd6c510a-7749-4a14-99ed-34f2e316e478",
            "isDeleted": 0,
            "status": "Active",
            "createdAt": "2018-03-07T06:13:07.695Z",
            "updatedAt": "2018-03-07T06:13:07.695Z"
        }
    ]
}
 *
 * @apiSampleRequest http://localhost:3302/bd6c510a-7749-4a14-99ed-34f2e316e478/fleets/
 *
 */
router.get('/:tenantId/fleets', function (req, res) {
    req.sanitizeBody('limit').trim();
    req.sanitizeBody('page').trim();
    req.sanitizeBody('sort').trim();
    req.sanitizeBody('order').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();

    if (!empty(req.query.limit)) {
        req.checkQuery('limit', 'Invalid').optional().isInt();
    }
    if (!empty(req.query.page)) {
        req.checkQuery('page', 'Invalid').optional().isInt();
    }
    if (!empty(req.query.sort)) {
        req.checkQuery('sort', 'Invalid').optional().isIn(constants.vehicleSortFields);
    }
    if (!empty(req.query.order)) {
        req.checkQuery('order', 'Invalid').optional().isIn(constants.order);
    }

    var errors = req.validationErrors(true);
    if (errors) {
        res.status(HttpStatus.BAD_REQUEST).send(util.responseUtil(errors, null, responseConstant.INVALIDE_REQUEST_PARAMETERS));
    } else {
        auth.isTenantIDValid(req, req.params.tenantId).then(function (result) {
            service.getAllFleetData(req).then(function (result) {
                res.status(HttpStatus.OK).send(result);
            }, function (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
            });
        }, function (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
});


//Update Fleet Api
/**
 * @api {put} /:tenantId/fleets/:id Update Fleet 
 * @apiVersion 1.0.0
 * @apiName UpdateFleet
 * @apiGroup Fleet
 *
 * @apiDescription Update Fleet. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X PUT  --data '{"fleeName": "Updated fleet","description":"info about fleet","00c59a06-0ec1-4f54-bd98-3ffbdfea7ed6":"4564654","fleetadminId":"ed572b86-a5ea-43b6-a5bc-cdc2f1251597"}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleet/5a2a8b63a4894865d03600a7
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 * 
 * @apiParam {String} [fleetName=null]   Fleet Name(optional).
 * @apiParam {String} [description=null]  Description(optional).
 * @apiParam {String} [fleetAdminId=null]  FleetAdminId(optional).
 * @apiParam {UUID[]} vehicleIdList List of vehilces Id.
 * @apiParam {Boolean} isVehicleRemove Flag to remove vehicles from fleet.
 *
 * @apiParamExample {json} Request-Example:
 *     	{
 *	 "fleetName": "MS Updated fleet"
    "isVehicleRemove":true,
    "vehicleIdList":["4b93dd70-83a0-40a9-b71c-ed9fd232af71","5483eeb9-38ae-4baf-8861-e84dc70c689d"]
 *       }
 *
 *
 * @apiError Unauthorized The Fleet token was invalid.
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
 * @apiSuccess {String} fleetName fleetName Fleet Name.
 * @apiSuccess {String} description Description.
 * @apiSuccess  {String} fleetAdminId FleetAdmin Id.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *   {
    "message": "Success",
    "data": {
        "fleetName": "MS Updated fleet",
        "updatedAt": "2018-02-27T11:03:40.144Z"
    }
}
 *
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.put('/:tenantId/fleets/:id', function (req, res) {


    req.sanitize('fleetName').trim();
    req.sanitize('fleetAdminId').trim();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();

    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();

    if (!empty(req.body.fleetName)) {
        req.checkBody('fleetName', 'Invalid fleetName.').isLength(3, 20);
    }
    if (!empty(req.body.fleetAdminId)) {
        req.checkBody('fleetAdminId', 'Invalid FleetAdminId ').isUUID();
    }
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


//Delete Fleet Api
/**
 * @api {delete} /:tenantId/fleets/:id Delete Fleet 
 * @apiVersion 1.0.0
 * @apiName DeleteFleet
 * @apiGroup Fleet
 *
 * @apiDescription Delete Fleet. 
 *
 * @apiHeader {String} Authorization authorization token.
 *
 * @apiExample Example usage:
 * curl -i -X DELETE  --data '{}' http://<ip>:<port>/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6
 * -H "Authorization:<access-token>" -H "Content-Type: application/json" 
 *
 * @apiError Unauthorized The Fleet token was invalid.
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
 * @apiSampleRequest http://localhost:3302/80201e76-3360-48d3-9804-e5e6a6a4edcb/fleets/4aedcab5-9413-4219-b09f-e652df7be3b6
 *
 */
router.delete('/:tenantId/fleets/:id', function (req, res) {
    req.checkParams('id', 'Id can not be empty').notEmpty();
    req.checkParams('id', 'Invalid id').isUUID();

    req.checkParams('tenantId', 'TenantId can not be null').notEmpty();
    req.checkParams('tenantId', 'Invalid TenantId ').isUUID();

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
