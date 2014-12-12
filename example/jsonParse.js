"use strict";
// An example of benchmarking JSON stringify using benchmarksman


// setup
var getAlphabetObj = function(val) {
		return "abcdefghijklmnopqrstuvwxyz".split("").reduce(function(r, k, i) {
			r[k] = val instanceof Function ? val(k, i, r) : val;
			return r;
		}, {});
	},
	obj = getAlphabetObj(getAlphabetObj(getAlphabetObj(1))),
	str = JSON.stringify(obj),
	buf = new Buffer(str);


// tests
exports.jsonParse = {

	"a String": function() {
		JSON.parse(str);
	},

	"a Buffer": function() {
		JSON.parse(buf);
	},

};


// if run directly run benchmarks
if (!module.main) require("benchmarksman").runner(exports);
