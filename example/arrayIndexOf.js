"use strict";
// An example of benchmarking Arrays using benchmarksman


exports.arrayIndexOf = {

	// setup
	before: function() {

		this.arr = Array.apply(0, new Array(1000)).map(function(v, i) {
			return i;
		});

		this.getIndexOf = function getIndexOf(arr, item) {
			for (var i = 0, l = arr.length; i < l; i++) {
				if (arr[i] === item)
					return i;
			}
			return -1;
		};

	},

	"fn native": function() {
		this.arr.indexOf(this.arr.length - 1);
	},

	"fn for loop": function() {
		this.getIndexOf(this.arr, this.arr.length - 1);
	},

	"inline for loop": function() {
		var arr = this.arr,
		item = this.arr.length - 1;
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i] === item)
				break;
		}
	},

};

// if run directly run benchmarks
if (!module.parent) require("benchmarksman").runner(exports);
