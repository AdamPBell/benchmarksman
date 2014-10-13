"use strict";

exports.Maths = {

	"multiply": function(){
		return 2 + 2;
	},

	"divide": function(){
		return 42 / 11;
	}

};

if (!module.main) require("benchmarksman").runner(exports);
