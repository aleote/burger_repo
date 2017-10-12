var orm = require("../config/orm.js");

var burgerPatty = {
	all: function(cb){
		orm.all("burgers", function(res){
			cb(res);
		});
	},

	create: function(cols,vals, cb){
		orm.create("bugers", cols, vals, function(res){
			cb(res);
		});
	},

	update: function(onjColVals, condition, cb){
		orm.update("burgers", objColVals, condition, function(res){
			cb(res);
		});
	}

}; //this ends burgerPatty function



module.exports = burgerPatty;