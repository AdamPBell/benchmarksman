"use strict";

/**
 * Create benchmarks defined similarly to tests in the mocha exports UI
 */
var path = require("path"),
	benchmark = require("benchmark"),
	reporter = require("./reporter");

/**
 * Runner for benchmarks defined similarly to tests in the mocha exports UI
 * @param  {Object|Array|String} tests      The tests walk and execute
 * @private
 */
module.exports = function runner(tests) {
	var ctx = this && this !== global ? this : {};
	if (!ctx.reporter) ctx.reporter = reporter;
	if (typeof tests === "string") tests = require(ctx.file = path.resolve(tests));
	if (Array.isArray(tests) && !ctx.parent) return tests.forEach(runner.bind(ctx));
	if (tests.before instanceof Function) tests.before.call(ctx);
	for (var name in tests) {
		if (!tests.hasOwnProperty(name)) continue;
		if (~["before", "after", "beforeEach", "afterEach"].indexOf(name)) continue;
		var test = tests[name],
			fullName = ctx.fullName ? ctx.fullName + " " + name : name;
		if (test instanceof Function) {
			var bench = benchmark(fullName, test, {defer: test.length === 1});
			reporter.call(ctx, bench);
			try {
				if (tests.beforeEach instanceof Function) tests.beforeEach.call(ctx);
				test(); // run once outside of bench for better error handling
				bench.run();
				if (tests.afterEach instanceof Function) tests.afterEach.call(ctx);
			} catch (e) {
				bench.emit("error", bench.error = e);
			}
		} else {
			var newCtx = {};
			for (var key in ctx) {
				if (ctx.hasOwnProperty(key)) newCtx[key] = ctx[key];
			}
			newCtx.parent = ctx;
			newCtx.name = name;
			newCtx.fullName = fullName;
			runner.call(newCtx, test);
		}
	}
	if (tests.after instanceof Function) tests.after.call(ctx);
};
