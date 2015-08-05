function ctrl($scope,$http) {
    // Запрос GET к RESTful web API
        $scope.getCompanies=function() {
       $http.get("/rest/json/companies").success(function(data) {
             // Помещаем ответ сервера в переменную companies
           $scope.companies=data.children;
       }).error(function(data, status) {
                 // Вывод информации об ошибке, если таковая возникнет
           alert("["+status+"] Ошибка при загрузке компаний! ["+data+"]");
       });
   };
  
      // Создать новую компанию
    $scope.create = function (company){
       $http.post("http://localhost:57772/csp/rest/json/accounts",company)
       .success(function(data){$scope.getCompanies();$scope.alertzone="Добавили компанию "+company.Name;}).error(function(data,status){
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
