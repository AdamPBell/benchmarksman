"use strict";
// benchmark ways to check if is an Object of some sort


// setup
function Thing() {}
var thing = new Thing();


// tests
exports.typeObject = {

	"instanceof check": function() {
		thing instanceof Object;
	},

	"null check, typeof check": function() {
		thing !== null && typeof thing === "object";
	},

	"typeof check, null check": function() {
		typeof thing === "object" && thing !== null;
	},

};


// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
