'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressValidator = require('express-validator');
var fleet = require('./routes/fleet');
var vehicle = require('./routes/vehicle');
var device = require('./routes/device');
var request = require('request');

/**
 * Database Connection
 */
require('./src/config/databaseConnection');
var fs = require('fs');
var app = express();
var oauth = require('./src/config/authentication');
app.isAuthenticate = oauth.isAuthenticate;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(expressValidator());


/**
  *  Documentation api gateway
  */
app.get('/docs', function (req, res, next) {
    res.render('login');
})

app.use('/docs/authenticated', function (req, res, next) {

    if (req.body.username == "admin" && req.body.password == "fleet@123") {

        let a = path.join(__dirname, 'apidoc/index.html');

        fs.readFile(a, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write(error);
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.write(data);
                res.end();
            }
        });

    }
    else {
        res.render('Unauthorised');
    }

});


app.use('/docs', express.static(path.join(__dirname, 'apidoc')));

// base interface
app.get('/', function (req, res, next) {
    res.end('welcome to Fleet Management...!');
});



app.post('/powerbi/auth', function (req, res) {
    var authReq = {
        "grant_type": "password",
        "username": "Mobiliya-Fleet-Mgmt@mobiliya.com",
        "password": "Mobiliya!@#$",
        "client_id": "fd42d25d-04e6-4541-bc35-75d9928828ac",
        "client_secret": "I6iIR1hlb7eCzI1z9yc856SBLgQM1t0ycKxnwZYFgsE=",
        "resource": "https://analysis.windows.net/powerbi/api"
    }
    request.post({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        url: 'https://login.microsoftonline.com/common/oauth2/token',
        form: authReq
    }, function (error, response, body) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.status(200).send(body);
    });
});

app.use(app.isAuthenticate);
app.use('/', fleet);
app.use('/', vehicle);
app.use('/', device);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var portNumber = process.env.port || process.env.PORT || 3302;
app.set('port', portNumber);


var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
