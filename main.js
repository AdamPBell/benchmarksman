#!/usr/bin/env node
"use strict";

var lib = require("./lib"),
	runner = lib.runner;

/**
 * Main command handler if this is run directly
 */
module.exports = function main() {
	var pkg = require("./package.json"),
		args = process.argv.slice(2);
	if (args.length === 0 || ~["-h", "--help"].indexOf(args[0])) {
		console.error("USAGE: %s [bench/slow.js]", pkg.name);
	}
	args.forEach(runner);
};
