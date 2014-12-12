"use strict";
// benchmark ways to clear an Array


// tests
exports.arrayExtend = {

	beforeEach: function() {

		var N = 1000;
		this.MAX = N * 1000;

		this.arr = [];

		this.data = Array.apply(0, new Array(this.N)).map(function(v, i) {
			return i;
		});

		Array.prototype.extendForEachPush = function extendForEachPush(items) {
			items.forEach(function(x) {
				this.push(x);
			}, this);
		};

		Array.prototype.extendForAssign = function extendForAssign(items) {
			for (var ii = this.length, i = 0, l = items.length; i < l; i++) {
				this[ii++] = items[i];
			}
		};

		Array.prototype.extendPushApply = function extendPushApply(items) {
			this.push.apply(this, items);
		};

	},

	"assign old.concat(new)": function() {
		this.arr = this.arr.concat(this.data);
		if (this.arr.length > this.MAX) this.arr = [];
	},

	"forEach push": function() {
		this.arr.extendForEachPush(this.data);
		if (this.arr.length > this.MAX) this.arr = [];
	},

	"for assign": function() {
		this.arr.extendForAssign(this.data);
		if (this.arr.length > this.MAX) this.arr = [];
	},

	"push apply": function() {
		this.arr.extendPushApply(this.data);
		if (this.arr.length > this.MAX) this.arr = [];
	},

};


// if run directly run benchmarks
if (!module.main) require("benchmarksman").runner(exports);
