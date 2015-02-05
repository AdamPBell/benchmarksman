"use strict";
// benchmark ways to get current time


// tests
exports.dateGetTime = {

	"#getTime()": function() {
		new Date().getTime();
	},

	".now()": function() {
		Date.now();
	},

};


// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
