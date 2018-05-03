'use strict';
/**
  This module is use to define Common Schema objects and functions
  @module commonModel
  @author shweta.ghenand
  @version 1.0.0
*/
/**
  import npm modules
*/
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;

/**
 *  Base model schema Object
 *  @type {object}
 *  @property {string}  createdOn.
 *  @property {string}  updatedOn.
 *  @property {string}  deletedOn.
 */

var base = {
    _id: {
        type: String,
        default: uuid.v4
    },
    isDeleted: {
        type: Boolean,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
};

/**
 *  Base model schema Object
 *  @type {object}
 *  @property {string}  createdOn.
 *  @property {string}  updatedOn.
 *  @property {string}  deletedOn.
 */
var extendBase = function () {
    var baseModel = new mongoose.Schema(base);
    baseModel.plugin(uniqueValidator);
    return baseModel;
};


/** expose  extend base to app
 *  @type {object}
 *  @property {object}  extendBase.
 *  @property {object}  groups.
 *  @property {object}  permissions.
 */
module.exports = {
    extendBase: extendBase
};