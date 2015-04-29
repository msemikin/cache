var cacheApp = angular.module("Cache", []);

cacheApp.controller("LoginController", ["$scope", "$http", function ($scope, $http) {

	$scope.student = true;

	$scope.teacher = false;

	$scope.login = 'admin';

	$scope.password = 'admin';

	$scope.setTeacher = function () {
		this.student = false;
		this.teacher = true;
		console.log(this);
	};

	$scope.setStudent = function () {
		this.student = true;
		this.teacher = false;
	};

	$scope.submitLogin = function () {
		var serverURL = "http://localhost:57772/rest/json/accounts";

		// указываем класс process для div-а сообщений и плавно показываем его
		$("#login_result").removeClass().addClass('process').text('Проверка....').fadeIn(1000);

		var url = serverURL + '/' + this.login + '/' + this.password;

		var responsePromise = $http.get(url);

		responsePromise.error(function () {
			window.alert('error');
			console.log(arguments);
		});

		responsePromise.success(function (data) {
			window.alert(data.children[0].Id);
			window.location = "http://localhost:57772/csp/test/pg/workenv.html";
		});
	};
}]);
