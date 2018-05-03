'use strict';
/**
 *  This module is use to define constants
 *  @module constants
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 *  import project modules
 */
var constants = {};
/**
 *  constansts
 */

constants.order=['asc','desc'];
constants.fleetSortFields=['fleetName','tenantId','fleetAdminId','createdAt','updatedAt'];
constants.vehicleSortFields=['vehicleName','model','type','VIN','userId','tenantId','createdAt'];
constants.deviceSortFields=['deviceName','serialNo','lastConnectedTime','protocolVersion','deviceType','createdAt'];

/**
 *  export module
 */
module.exports = constants;