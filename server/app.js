var express = require('express');
var controller = require('./controller/controller.js');
var bodyParser = require('body-parser');

var app = express();

/**
 * Staring the server
 */
var server = app.listen(8001, function () {
  var port = server.address().port;
  console.log('Server running on port %d', port);

});

//Configuring the header to allow connections from other domains
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
};

//Configurations to receive JSON and accept CORS
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));


//Login method accessing from controller
app.post('/login', controller.login);

//List method accessing from controller
app.get('/list', controller.list);