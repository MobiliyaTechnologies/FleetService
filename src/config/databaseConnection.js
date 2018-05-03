

'use strict';
/**
 *  This module is use to define database connection
 *  @module database connection
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * npm modules
 */
var mongoose = require('mongoose');

/**
 *  import project module
 */
var config = require('./config.json');
config = config[config.activeEnv];
var util = require("../util/commonUtil");
var responseConstant = require("../constant/responseConstant");
var logger = require('../util/logger');


/*SQL DB Connection*/
var Sequelize = require('sequelize');


/**
 *  Define database connection
 */

module.exports = {
    /**
        *  define database creation
        */
    createDb: function (dbName) {
        return new Promise(function (resolve, reject) {
            var sequelize = new Sequelize("", config.databaseConnection.dbUserName, config.databaseConnection.dbUserPassword, {
                host: config.databaseConnection.dbHost,
                dialect: config.databaseConnection.dbDialect,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                },
                dialectOptions: {
                    encrypt: true
                },
                logging: false
            });
            sequelize.query("SELECT count(name)as dbCount FROM sys.databases WHERE name = '" + dbName + "'").then(function (result) {
                if (result[0][0].dbCount === 0) {
                    var query = "CREATE DATABASE  " + dbName;
                    return sequelize.query(query).then(function (result) {
                        logger.info("Database created successfully!");
                        return resolve(result);
                    }, function (err) {
                        logger.info("Error in database creation", err);
                        return reject(err);
                    });
                } else if (result[0][0].dbCount === 1) {
                    return resolve();
                }
            }, function (err) {
                logger.error(err);
            })

        });
    },
    /**
       *  define database connection
       */
    connectDb: function (dbName) {
        return new Promise(function (resolve, reject) {
            var sequelize = new Sequelize(dbName, config.databaseConnection.dbUserName, config.databaseConnection.dbUserPassword, {
                host: config.databaseConnection.dbHost,
                dialect: config.databaseConnection.dbDialect,
                pool: {
                    max: 5,
                    min: 0,
                    idle: 10000
                },
                dialectOptions: {
                    encrypt: true
                },
                logging: false
            });

            sequelize
                .authenticate()
                .then(function (data) {
                    logger.info(" Getting connection object.");
                })
                .catch(function (err) {
                    logger.error("Unable to connect to the database." + err);
                });
            var models = [
                'fleets',
                'devices',
                'vehicles'
            ];
            models.forEach(function (model) {
                console.log("Model :: ", model, module.exports[model]);
                module.exports[model] = sequelize.import('../models/' + model);
                module.exports[model].sync().then(() => {
                    logger.info(model + ' table created successfully');
                    return resolve();
                }).catch((err) => {

                    logger.error('An error occur while creating table' + model, err);
                    return reject(err);
                });
            });

        });


        /**
 *  export modules
 */
        exports.sequelize = sequelize;
        exports.Sequelize = Sequelize;
    }
}