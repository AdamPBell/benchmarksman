/*globals angular:true, benchmarksman:true*/
angular.module("app", [
	"ui.bootstrap",
	"ui.ace"
])

.controller("MainCtrl",
["$scope", "$timeout", "$interpolate",
function($scope, $timeout, $interpolate) {

	$scope.tests = "";
	$scope.output = "";
	$scope.isRunning = false;

	$scope.exampleName = "dateGetTimeAsNumber";
	$scope.examples = {

		dateGetTimeAsNumber: {

			"#getTime()": function() {
				new Date().getTime();
			},

			".now()": function() {
				Date.now();
			},

		},

		arrayIndexOf: {

			before: function() {

				this.arr = Array.apply(0, new Array(1000)).map(function(v, i) {
					return i;
				});

				this.getIndexOf = function getIndexOf(arr, item) {
					for (var i = 0, l = arr.length; i < l; i++) {
						if (arr[i] === item)
							return i;
					}
					return -1;
				};

			},

			"fn native": function() {
				this.arr.indexOf(this.arr.length - 1);
			},

			"fn for loop": function() {
				this.getIndexOf(this.arr, this.arr.length - 1);
			},

			"inline for loop": function() {
				var arr = this.arr,
					item = this.arr.length - 1;
				for (var i = 0, l = arr.length; i < l; i++) {
					if (arr[i] === item)
						break;
				}
			},

		},

	};


	$scope.setExample = function(exName) {
		$scope.exampleName = exName;
	};


	$scope.$watch("exampleName", function onExampleNameChanged() {
		if (!($scope.exampleName in $scope.examples))
			throw new Error("invalid exampleName");
		var example = $scope.examples[$scope.exampleName],
			tests = "exports." + $scope.exampleName + " = {\n";
		for (var key in example) {
			if (key in example) {
				var fnStr = String(example[key]).split("\n\t\t\t").join("\n\t");
				tests += "\n\t" + JSON.stringify(key) + ": " + fnStr + ",\n";
			}
		}
		tests += "\n};\n";
		$scope.tests = tests;
		$scope.output = "";
	});


	var _reporter = function _reporter(bench) {
		// var ctx = this;
		return bench
			.on("error", function() {
				$scope.output += String(bench.error);
				$scope.$apply();
				throw bench.error;
			})
			.on("complete", function() {
				$scope.output += String(this) + "\n";
				$scope.$apply();
			});
	};


	$scope.run = function run() {

		$scope.output = "";
		$scope.isRunning = true;

		// force UI update if not in progress (i.e., from non-angular event)
		if (!$scope.$$phase)
			$scope.$apply();

		try {

			//jshint evil:true
			var tests = eval("(exports={})," + $scope.tests);
			//jshint evil:false

			$timeout(function() { // defer a bit to allow UI to update

				var benchCtx = {
					reporter: _reporter
				};
				benchmarksman.runner.call(benchCtx, tests);

				$scope.isRunning = false;
				$scope.$apply();

			});

		} catch (err) {

			$scope.isRunning = false;
			$scope.output = String(err);
			$scope.$apply();

		}
	};


	$scope.aceLoaded = function aceLoaded(editor) {

		// Set cmd-enter to run
		editor.commands.addCommand({
			name: "run",
			bindKey: {
				win: "Ctrl-Enter",
				mac: "Command-Enter"
			},
			exec: function(editor) {
				$scope.run();
			},
			readOnly: true // false if this command should not apply in readOnly mode
		});

	};


}]);
