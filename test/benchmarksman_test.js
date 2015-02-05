var assert = require("assert"),
	benchmarksman = require("../");

exports.benchmarksman = {

	"should run benchmarks": function(done) {
		this.timeout(0);
		var benchmarks = {
				"do nothing": function() {
					null;
				},
				"do maths": function() {
					1 + 2 - 3 / 4 * 5 % 6;
				},
			},
			benchmarksKeys = Object.keys(benchmarks),
			benchmarksCount = benchmarksKeys.length,
			benchmarked = {},
			benchmarkedKeys = [],
			benchmarkedCount = 0,
			opts = {
				reporter: function(bench) {
					benchmarksman.reporter.apply(this, arguments);
					bench.on("complete", function() {
						benchmarked[bench.name] = bench;
						benchmarkedKeys.push(bench.name);
						benchmarkedCount++;
						if (benchmarkedCount === benchmarksCount){
							assert.deepEqual(benchmarkedKeys, benchmarksKeys);
							assert(benchmarked["do nothing"].hz > benchmarked["do maths"].hz,
								"doing nothing should be faster than doing maths");
							return done();
						}
					});
				}
			};
		benchmarksman.runner.call(opts, benchmarks);
	},

};

// Mocha one-liner to make these tests self-hosted
if (!module.parent) (new(require("mocha"))()).addFile(__filename).ui("exports").run(process.exit);
