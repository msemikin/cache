
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

function encodeUser(user) {
	user.name = encode(user.name);
	user.surname = encode(user.surname);
	user.jobTitle = encode(user.jobTitle);
	user.workPlace = encode(user.workPlace);
	user.password = encode(user.password);
	return user;
}
var flag = true;
var cacheApp = angular.module("cache", []);

function ctrl($scope,$http) {
    // Запрос GET к RESTful web API
        $scope.getCompanies=function() {
			
   };
  
      // Создать новую компанию
    $scope.create = function (company){
       $http.post("http://localhost:57772/csp/rest/json/company",encodeUser(company))
       .success(function(data){
		   $.cookie("session", JSON.stringify(company));
		   var url = "http://localhost:57772/csp/user/git/pg/workenv.html";
			window.location = url;
	   }).error(function(data,status){alert("tut1");alert(data);});   
    }

    // Обновить существующую компанию
  $scope.update = function (company){
       $http.put("/rest/json/company/"+company.ID,company)
        .success(function(data){$scope.alertzone="Обновили компанию "+company.Name;}).error(function(data,status){ // поменял alert(....); на alertzone
        $scope.alertzone="["+status+"] Ошибка обновления имени компании :( ["+data+"]"; });
    }
            
    // Удалить компанию
    $scope.delete = function (company){
        $http.delete("/rest/json/company/"+company.ID)
        .success(function(data){$scope.getCompanies();$scope.alertzone="Удалили компанию "+company.Name;}).error(function(data,status){});
    }
	
	$scope.submitLogin = function () {
		var serverURL = "http://localhost:57772/csp/rest/json/accounts";
		var url = serverURL + '/' + this.login + '/' + encode(this.password);
		
		var responsePromise = $http.post(url);

		responsePromise.error(function () {
			window.alert('error');
			console.log(arguments);
		});

		responsePromise.success(function (data) {
			$.cookie("session", JSON.stringify(data));
			var url = "http://localhost:57772/csp/user/git/pg/workenv.html";
			window.location = url;
		});
	};
};


