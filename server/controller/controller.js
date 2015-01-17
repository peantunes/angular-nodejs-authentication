
var model = require('../model/model.js');

exports.login = function (req, res) {
  	res.setHeader('Access-Control-Allow-Origin', '*');

	var status = "AUTH_FAILURE";

	var user = req.body.user.toLowerCase();
	var password = req.body.password;
	if (user){
		if (model.authentication(user,password)){
  			res.send({token:'12345'});
			status = "AUTH_SUCCESS";
		}else{
			res.status(401);
			res.send({error:'user or password invalid'});
		}
	}else{
		res.status(401);
		res.send({error:'Invalid format'});
	}
	var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var timestamp = (new Date()).getTime() / 1000;
	var log = new model.LogAuthentication({ip:ipAddress, user:user, date: timestamp, action:status});
	
	log.save();
};

exports.list = function(req, res){
  	res.setHeader('Access-Control-Allow-Origin', '*');

	var myLog = [];
	model.LogAuthentication.find(function(err, logs){
		res.send(JSON.stringify(logs));
	});
};