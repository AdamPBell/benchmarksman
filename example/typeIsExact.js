"use strict";
// benchmark ways to check if is exact type


// setup
var Thing = function Thing() {},
	thing = new Thing(),
	objToStr = Object.prototype.toString,
	getTypeStr = function getTypeStr2(obj) {
		return objToStr.call(obj);
	};


// tests
exports.typeIsExact = {

	"getTypeStr (Object#toString.call)": function() {
		getTypeStr(thing) === "[object Function]";
	},

	"instanceof, constructor matches": function() {
		thing instanceof Thing && thing.constructor === Thing;
	},

	"truthy, constructor matches": function() {
		thing && thing.constructor === Thing;
	},

	"not undefined, not null, constructor matches": function() {
		thing !== undefined && thing !== null && thing.constructor === Thing;
	},

	"typeof, not null, constructor matches": function() {
		typeof thing === "object" && thing !== null && thing.constructor === Thing;
	},

};


// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
