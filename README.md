benchmarksman
=============

A handy wrapper around [benchmark.js][benchmark] to make writing
benchmarks as easy as writing test cases (using the
[mocha][mocha] exports UI).



Why
===

Using [benchmark.js][benchmark] directly can be a little tedious if you just
want it to log ops/sec for a bunch of different code snippets.



Usage
=====

Command Line
------------
```bash
benchmarksman bench/array.js
```

Programmatic
------------
```javascript
exports.Date = {
	"#getTime()": function(){
		new Date().getTime();
	},
	".now()": function(){
		Date.now();
	}
};
if (!module.main) require("benchmarksman").runner(exports);
```

Output
------
```console
Date #getTime() x 7,705,532 ops/sec ±2.95% (94 runs sampled)
Date .now() x 15,132,312 ops/sec ±1.85% (94 runs sampled)
```





[benchmark]: http://benchmarkjs.com
[mocha]: http://visionmedia.github.io/mocha/
