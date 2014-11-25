"use strict";
// benchmark ways to check if is an Array


// setup
var arr = [];


// tests
exports.typeArray = {

	"instanceof check": function() {
		arr instanceof Array;
	},

	"typeof check, constructor check": function() {
		typeof arr === "object" && arr.constructor === Array;
	},

};


// if run directly run benchmarks
if (!module.main) return require("benchmarksman").runner(exports);
