"use strict";
var lib = require("./lib/"),
	runner = lib.runner;

/**
 * Main command handler if this is run directly
 * @namespace benchmarksman
 * @method main
 */
module.exports = function main() {
	var pkg = require("./package.json"),
		args = process.argv.slice(2);
	if (args.length === 0 || ["-h", "--help"].indexOf(args[0]) !== -1) {
		console.error("USAGE: %s [bench/slow.js]", pkg.name);
	}
	args.forEach(runner);
};
