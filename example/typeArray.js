"use strict";
// benchmark ways to check if is an Array


// setup
var arr = [],
	objToStr = Object.prototype.toString,
	getTypeStr = function getTypeStr2(obj) {
		return objToStr.call(obj);
	};


// tests
exports.typeArray = {

	"getTypeStr (Object#toString.call)": function() {
		getTypeStr(arr) === "[object Array]";
	},

	"Array.isArray": function() {
		Array.isArray(arr);
	},

	"instanceof check": function() {
		arr instanceof Array;
	},

	"typeof check, constructor check": function() {
		typeof arr === "object" && arr.constructor === Array;
	},

};


// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
