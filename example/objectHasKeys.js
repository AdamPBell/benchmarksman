"use strict";
// benchmark ways to check if object has keys


// setup
var obj = {foo:"foo", bar:"bar", baz:"baz", qux:"qux", stuff:"stuff", things:"things"};

function hasFirstKey(o) {
	for (var k in o) { //jshint ignore:line
		return true;
	}
	return false;
}

// tests
exports.objectHasKeys = {

	"inline: getOwnPropertyNames length > 0": function() {
		Object.getOwnPropertyNames(obj).length > 0;
	},

	"inline: getOwnPropertyNames length": function() {
		Object.getOwnPropertyNames(obj).length;
	},

	"inline: keys length > 0": function() {
		Object.keys(obj).length > 0;
	},

	"inline: keys length": function() {
		Object.keys(obj).length;
	},

	"inline: for k in obj, if hasOwnProperty, return": function() {
		for (var k in obj) {
			if (obj.hasOwnProperty(k))
				return true;
		}
		return false;
	},

	"inline: for k in obj, return": function() {
		for (var k in obj) { //jshint ignore:line
			return true;
		}
		return false;
	},

	"helper: for k in obj, return": function() {
		hasFirstKey(obj);
	},

};


// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
