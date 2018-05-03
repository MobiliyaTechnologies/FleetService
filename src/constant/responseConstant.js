'use strict';
/**
 *  This module is use to define response constants
 *  @module responseConstants
 *  @author shweta.ghenand
 *  @version 1.0.0
 */

/**
 * npm modules
 */

/*
** Sequelize error code series starts from 1001
** undefined error code series starts from 3001
** Business logic error code series starts from 5001
** Internal error code series starts from 7001
*/

var constants = {};

constants.SUCCESS = 0;

constants.SEQUELIZE_DATABASE_ERROR = 1001;
constants.SEQUELIZE_VALIDATION_ERROR = 1002;
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR = 1003;
constants.SEQUELIZE_DATABASE_TRANSACTION_ERROR = 1004;
constants.SEQUELIZE_CONSTRAINT_ERROR_CODE = 1005;
constants.UNDEFINED_DATABASE_ERROR = 1006;
constants.SEQUELIZE_DATABASE_ERROR_NAME_CODE = 1007;
constants.SEQUELIZE_VALIDATION_ERROR_NAME_CODE = 1008;
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME_CODE = 1009;


constants.VALID_CREDENTIALS = 1101;
constants.EMAIL_ALREADY_EXIST = 1102;
constants.ERROR_OCCURED_IN_GETTING_USER_LIST = 1103;
constants.UPDATE_DATA_ERROR = 1104;
constants.DELETE_DATA_ERROR = 1105;
constants.UNPROCESSABLE_ENTITY = 1106;
constants.INVALID_JSON_OBJECT = 1107;
constants.UNABLE_TO_SEND_EMAIL = 1108;
constants.RUN_TIME_ERROR = 1109;
constants.WRONG_PASSWORD = 1110;
constants.DUPLICATION_ERROR = 1111;
constants.SYSTEM_ERROR = 1112;
constants.ACCESS_DENIED = 1113;
constants.RECORD_NOT_FOUND = 1114;

constants.REQUEST_SENT_ALREADY = 1115;
constants.DEVELOPER_COUNT_EXCEEDS = 1116;
constants.VERSION_DOES_NOT_CHANGED = 1117;
constants.NO_RECORD_DELETED = 1118;
constants.PACKAGENAME_DUPLICATION_ERROR = 1119;
constants.LOGGED_OUT_ERROR = 1120;
constants.INVALIDE_REQUEST_URL = 1121;
constants.UNAUTHORIZE = 1122;
constants.INVALIDE_CREDENTIAL = 1123;
constants.INVALIDE_REQUEST_PARAMETERS = 1124;
constants.PASSWORD_CHANGE_ERROR = 1125;
constants.ROLE_ALREADY_ASSIGN = 1126;
constants.INVALIDE_ROLE = 1127;
constants.INVALIDE_COMPANY = 1128;
constants.INVALID_TENANTID=1129;
constants.DB_CREATION_FAILED=1130;
constants.DB_CONNECTION_FAILED=1131;
constants.DB_DUPLICATION_ERROR=1132;
constants.USER_EXIST = 1133;
constants.FLEET_ADMIN_NOT_FOUND= 1134;
constants.DEVICE_CREATION_ERROR=1135;
constants.DEVICE_NOT_FOUND=1136;
constants.FLEET_NOT_FOUND=1137;
constants.DRIVER_NOT_FOUND=1138;
constants.FLEET_ADMIN_NOT_BELONGTO_TENANT=1139;
constants.DRIVER_NOT_BELONGTO_TENANT=1140;
constants.ERROR_IN_DELETION = 1141;
constants.CLOUD_FILE_UPLOAD_ERROR = 2001;
constants.CLOUD_FILE_UPLOAD_SUCCESS = 2002;
constants.CLOUD_FILE_DELETION_ERROR = 2003;
constants.DOC_CREATION_ERROR = 2004;
constants.CLOUD_FILE_RETRIVE_ERROR = 2005;

constants.SEQUELIZE_DATABASE_ERROR_NAME = 'SequelizeDatabaseError';
constants.SEQUELIZE_VALIDATION_ERROR_NAME = 'SequelizeValidationError';
constants.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR_NAME = 'SequelizeForeignKeyConstraintError';
constants.SEQUELIZE_CONSTRAINT_ERROR = 'SequelizeUniqueConstraintError';
   
/**
 * export module
 */
module.exports = constants;