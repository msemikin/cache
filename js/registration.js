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

function ctrl($scope,$http) {
    // Запрос GET к RESTful web API
        $scope.getCompanies=function() {
       $http.get("http://localhost:57772/csp/rest/json/humans").success(function(data) {
             // Помещаем ответ сервера в переменную companies
           $scope.companies=data.children;
       }).error(function(data, status) {
                 // Вывод информации об ошибке, если таковая возникнет
           alert("["+status+"] Ошибка при загрузке компаний! ["+data+"]");
       });
   };
  
      // Создать новую компанию
    $scope.create = function (company){
       $http.get("http://localhost:57772/csp/rest/json/company",company)
       .success(function(data){$scope.getCompanies();window.alert(data.name);window.location = "http://localhost:57772/csp/user/git/pg/login.html"
	   }).error(function(data,status){window.alert(data);
        $scope.alertzone="["+status+"] Ошибка добавления компании :( ["+data+"]"; });
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
        .success(function(data){$scope.getCompanies();$scope.alertzone="Удалили компанию "+company.Name;}).error(function(data,status){
            $scope.alertzone="["+status+"] Ошибка удаления компании :( ["+data+"]"; });
    }
};
