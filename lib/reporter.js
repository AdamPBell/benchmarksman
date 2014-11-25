"use strict";

/**
 * Reporter for benchmarks.
 * @method reporter
 * @namespace benchmarksman
 * @param {Benchmark} bench  The `benchmark.js` test
 */
module.exports = function reporter(bench){
	var ctx = this;
	return bench
		.on("error", function(){
			if (ctx.file) console.error("ERROR in file: " + ctx.file);
			throw bench.error;
		})
		.on("complete", function() {
			console.log(String(this));
		});
};
