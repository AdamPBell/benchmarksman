"use strict";

/**
 * Reporter for benchmarks.
 * @method reporter
 * @namespace benchmarksman
 * @param {Benchmark} bench  The `benchmark.js` test
 */
module.exports = function reporter(bench) {
	var self = this;
	return bench
		.on("error", function() {
			if (self.file) console.error("ERROR in file: " + self.file);
			throw bench.error;
		})
		.on("complete", function() {
			console.log(String(this));
		});
};
