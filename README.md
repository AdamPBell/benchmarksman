benchmarksman
=============
A handy wrapper around [benchmark.js][benchmark] to make writing
benchmarks as easy as writing test cases (in [mocha][mocha] via the exports UI).



## Why

Using [benchmark.js][benchmark] directly can be a little tedious if you just
want it to get the ops/sec for a bunch of different code snippets.



## Usage

Below are some of the ways to use `benchmarksman` in your project.

If instant gratification is your thing, then get your fix with a live demo
and run some quick benchmarks on the [playground site][gh-pages].



### Command Line
```console
benchmarksman bench/array.js
```


### Programmatic
```javascript
exports.dateGetTime = {

	"#getTime()": function() {
		new Date().getTime();
	},

	".now()": function() {
		Date.now();
	},

};

if (!module.main) require("benchmarksman").runner(exports);
```


### Output
```console
Date #getTime() x 7,705,532 ops/sec ±2.95% (94 runs sampled)
Date .now() x 15,132,312 ops/sec ±1.85% (94 runs sampled)
```





[benchmark]: http://benchmarkjs.com/
[mocha]: http://mochajs.org/
[gh-pages]: https://riveragroup.github.io/benchmarksman/
