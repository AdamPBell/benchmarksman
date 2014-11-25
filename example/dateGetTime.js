"use strict";
// benchmark ways to get current time


// tests
exports.Date = {
	"#getTime()": function(){
		new Date().getTime();
	},
	".now()": function(){
		Date.now();
	}
};


// if run directly run benchmarks
if (!module.main) return require("benchmarksman").runner(exports);
