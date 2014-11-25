"use strict";
// An example of benchmarking Arrays using benchmarksman


// setup
var noop = function() {},
	arr = new Array(1000).map(function(v, i) {
		return i;
	});


// tests
exports.arrayForEach = {

	"for": function() {
		for (var i = 0, l = arr.length; i < l; i++) {
			noop(arr[i]);
		}
	},

	"forEach": function() {
		arr.forEach(noop);
	},

};


// if run directly run benchmarks
if (!module.main) return require("benchmarksman").runner(exports);
