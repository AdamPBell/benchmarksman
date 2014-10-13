benchmarksman
=============

A handy wrapper around [benchmark.js][benchmark] to make writing
benchmarks as easy as writing test cases (using the
[mocha][mocha] exports UI).



Why
===

Using [benchmark.js][benchmark] directly can be a little annoying if you just
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
exports.Maths = {
	"multiply": function(){
		return 2 + 2;
	},
	"divide": function(){
		return 42 / 11;
	}
};
if (!module.main) require("benchmarksman").runner(exports);
```

Results
-------


[benchmark]: http://benchmarkjs.com
[mocha]: http://visionmedia.github.io/mocha/
