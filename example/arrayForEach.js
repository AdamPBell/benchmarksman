"use strict";
// An example of benchmarking Arrays using benchmarksman


// setup
var noop = function() {},
	arr = Array.apply(0, new Array(1000)).map(function(v, i) {
		return i;
	});


// tests
exports.arrayForEach = {

	"for loop": function() {
		for (var i = 0, l = arr.length; i < l; i++) {
			noop(arr[i]);
		}
	},

	"forEach loop": function() {
		arr.forEach(noop);
	},

};


// if run directly run benchmarks
if (!module.main) require("benchmarksman").runner(exports);
