"use strict";
var path = require("path"),
	benchmark = require("benchmark"),
	reporter = require("./reporter");

/**
 * Runner for benchmarks.
 * @method runner
 * @param {Object|Array|String} tests  The tests walk and execute
 *    if {Object}, should be in format similar to mocha `exports` UI
 *    if {String}, should be reference to file that exports tests
 *    if {Array}, should be list of tests
 */
module.exports = function runner(tests) { //jshint maxcomplexity:19
	var ctx = this && this !== global && this !== require("./") ? this : {};
	if (!ctx.reporter) ctx.reporter = reporter;
	if (typeof tests === "string") tests = require(ctx.file = path.resolve(tests));
	if (Array.isArray(tests) && !ctx.parent) return tests.forEach(runner.bind(ctx));
	if (tests.before instanceof Function) tests.before.call(ctx);
	for (var name in tests) { //jshint ignore:line
		if (!tests.hasOwnProperty(name)) continue;
		if (~["before", "after", "beforeEach", "afterEach"].indexOf(name)) continue;
		var test = tests[name],
			fullName = ctx.fullName ? ctx.fullName + " " + name : name;
		if (test instanceof Function) {
			var bench = benchmark(fullName, test);
			for (var key in ctx) {
				if (ctx.hasOwnProperty(key) && !bench.hasOwnProperty(key)) bench[key] = ctx[key];
			}
			reporter.call(ctx, bench);
			try {
				if (tests.beforeEach instanceof Function) tests.beforeEach.call(bench);
				test.call(bench); // run once outside of bench for better error handling
				bench.run();
				if (tests.afterEach instanceof Function) tests.afterEach.call(bench);
			} catch (e) {
				bench.emit("error", bench.error = e);
			}
		} else {
			var newCtx = {};
			for (var key2 in ctx) {
				if (ctx.hasOwnProperty(key2)){
					newCtx[key2] = ctx[key2];
				}
			}
			newCtx.parent = ctx;
			newCtx.name = name;
			newCtx.fullName = fullName;
			runner.call(newCtx, test);
		}
	}
	if (tests.after instanceof Function) tests.after.call(ctx);
};
