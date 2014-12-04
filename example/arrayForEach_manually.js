"use strict";
// An example of benchmarking Arrays using benchmark.js for comparison
var benchmark = require("benchmark");


// setup
var noop = function() {},
	arr = Array.apply(0, new Array(1000)).map(function(v, i) {
		return i;
	});


// tests
console.log(
	String(
		benchmark("forEach", function() {
			arr.forEach(noop);
		})
		.run()
	)
);
console.log(
	String(
		benchmark("for", function() {
			for (var i = 0, l = arr.length; i < l; i++) {
				noop(arr[i]);
			}
		})
		.run()
	)
);
