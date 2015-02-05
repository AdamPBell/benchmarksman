"use strict";

exports.maths = {

	"native multiply": function() {
		return 2 + 2;
	},

	"native divide": function() {
		return 42 / 11;
	},

};

if (!module.parent) require("benchmarksman").runner(exports);
