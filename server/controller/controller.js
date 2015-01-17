var model = require('../model/model.js');

var MY_TOKEN = '12345';

//Login process
exports.login = function (req, res) {
  	res.setHeader('Access-Control-Allow-Origin', '*');

	var status = "AUTH_FAILURE";

	var user = req.body.user.toLowerCase();
	var password = req.body.password;
	if (user){
		if (model.authentication(user,password)){
  			res.send({token:MY_TOKEN});
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
	var timestamp = (new Date()).getTime();
	var log = new model.LogAuthentication({ip:ipAddress, user:user, date: timestamp, action:status});
	
	log.save();
};

//List data process
exports.list = function(req, res){
  	res.setHeader('Access-Control-Allow-Origin', '*');

  	if (req.headers.authorization == MY_TOKEN){
		var myLog = [];
		model.LogAuthentication.find(function(err, logs){
			res.send(JSON.stringify(logs));
		});
	}else{
		res.status(401);
		res.send({error:"Invalid user"});
	}
};