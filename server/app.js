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

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));

app.post('/login', controller.login);

app.get('/list', controller.list);