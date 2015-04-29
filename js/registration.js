/**
            * Функция Скрывает/Показывает блок
            * @author ox2.ru дизайн студия
            **/
            function showHide(element_id, element2_id) {
                //Если элемент с id-шником element_id существует
                if (document.getElementById(element_id) && document.getElementById(element2_id)) {
                    //Записываем ссылку на элемент в переменную obj
                    var obj = document.getElementById(element_id);
                    var obj2 = document.getElementById(element2_id);
                    obj2.style.display = "none";
                    //Если css-свойство display не block, то:
                    if (obj.style.display != "block") {
                        obj.style.display = "block"; //Показываем элемент
                    }
                    else obj.style.display = "none"; //Скрываем элемент
                }
                //Если элемент с id-шником element_id не найден, то выводим сообщение
                else alert("Элемент с id: " + element_id + " не найден!");
            }

var cacheApp = angular.module("cache", []);

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
		var serverURL = "http://localhost:57772/csp/rest/json/accounts";

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
			window.location = "http://localhost:57772/csp/user/git/pg/workenv.html";
		});
	};
}]);
