var app = angular.module('mainApp', ['ngRoute']);
app.config([
	'$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: "views/home.html"
		});
	}]);


app.controller('mainCtrl', function($scope){
	$scope.tasks = [];
	var taskData  = localStorage['taskslist'];
	if (taskData !== undefined) {
		$scope.tasks = JSON.parse(taskData);
	}

	$scope.searchEnter =function(){
		if (event.which == 13 && $scope.task != "") {
			$scope.addTask();
			$scope.task = "";
		}
	};

	$scope.addTask = function(){
		$scope.tasks.push({'theTask': $scope.task, 'status': false});
		$scope.saveToLocal();
	};

	$scope.contentEdit = function(msg){
		event.target.contentEditable = event.target.contentEditable == 'false' ? 'true' : 'false';
	};

	$scope.editEnter= function(msg){
		if (event.which == 13 && event.target.innerText != null) {
			console.log($scope.tasks);
			for (i=0;i<$scope.tasks.length; i++) {
				if($scope.tasks[i].theTask == msg) {
					$scope.tasks[i].theTask = event.target.innerText;
				}
			}
			$scope.saveToLocal();
			$scope.contentEdit();
		}
	};
	$scope.reList = function() {
		$scope.tasks.sort(function(x, y) {
			//false values first
			return (x.status === y.status)? 0 : x.status? 1 : -1;
		});

		console.log($scope.tasks);
		$scope.saveToLocal();
	}
	$scope.saveToLocal = function(){
		localStorage['taskslist'] = JSON.stringify($scope.tasks);
	};

});
