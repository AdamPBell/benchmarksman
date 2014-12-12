"use strict";
// benchmark ways to check if is exact type


// setup
function Thing() {}
var thing = new Thing();


// tests
exports.typeIsExact = {

	"instanceof, constructor matches": function() {
		thing instanceof Thing && thing.constructor === Thing;
	},

	"not undefined, not null, constructor matches": function() {
		thing !== undefined && thing !== null && thing.constructor === Thing;
	},

	"truthy, constructor matches": function() {
		thing && thing.constructor === Thing;
	},

	"typeof, not null, constructor matches": function() {
		typeof thing === "object" && thing !== null && thing.constructor === Thing;
	},

};


// if run directly run benchmarks
if (!module.main) require("benchmarksman").runner(exports);
