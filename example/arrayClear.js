"use strict";
// benchmark ways to clear an Array


// tests
exports.arrayClear = {

	beforeEach: function() {
		this.arr = Array.apply(0, new Array(1000)).map(function(v, i) {
			return i;
		});
	},

	"length === 0": function() {
		this.arr.length = 0;
	},

	"while length, pop": function() {
		while (this.arr.length > 0) this.arr.pop();
	},

};


// if run directly run benchmarks
if (!module.main) return require("benchmarksman").runner(exports);
