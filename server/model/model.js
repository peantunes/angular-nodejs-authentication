var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//Expose the model
exports.LogAuthentication = mongoose.model('LogAuthentication', { user: String, action:String, ip: String, date: Number });

//Validation model
exports.authentication = function(user,password){
	var allowed_password = "password";
	var users = {'manager':true, 'admin':true, 'developer':true, 'tester':true};
	if (users[user]){
		if (password == allowed_password){
			return true;
		}
	}

	return false;
}