"use strict";
// benchmark ways to test if var is in a known set


// setup
var name = "things",
	arr = ["foo", "bar", "baz", "qux", "stuff", "things"],
	obj = {foo:"foo", bar:"bar", baz:"baz", qux:"qux", stuff:"stuff", things:"things"};


// tests
exports.knownSetHas = {

	"array indexOf closure": function() {
		return arr.indexOf(name) !== -1;
	},

	"array indexOf inline": function() {
		return ["foo", "bar", "baz", "qux", "stuff", "things"].indexOf(name) !== -1;
	},

	"object in closure": function() {
		return name in obj;
	},

	"object in inline": function() {
		return name in {foo:"foo", bar:"bar", baz:"baz", qux:"qux", stuff:"stuff", things:"things"};
	},

	"switch": function() {
		switch (name) {
			case "foo":
			case "bar":
			case "baz":
			case "qux":
			case "stuff":
			case "things":
				return true;
			default:
				return false;
		}
	},

	"if": function() {
		return name === "foo" ||
			name === "bar" ||
			name === "baz" ||
			name === "qux" ||
			name === "stuff" ||
			name === "things";
	},

};


// if run directly run benchmarks
if (!module.main) return require("benchmarksman").runner(exports);
