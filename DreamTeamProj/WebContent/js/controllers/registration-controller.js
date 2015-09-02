function ctrl($scope,$http) {
    // ������ GET � RESTful web API
        $scope.getCompanies=function() {
       $http.get("/rest/json/companies").success(function(data) {
             // �������� ����� ������� � ���������� companies
           $scope.companies=data.children;
       }).error(function(data, status) {
                 // ����� ���������� �� ������, ���� ������� ���������
           alert("["+status+"] ������ ��� �������� ��������! ["+data+"]");
       });
   };

      // ������� ����� ��������
    $scope.create = function (company){
       $http.post("http://localhost:57772/csp/rest/json/accounts",company)
       .success(function(data){$scope.getCompanies();$scope.alertzone="�������� �������� "+company.Name;}).error(function(data,status){
        $scope.alertzone="["+status+"] ������ ���������� �������� :( ["+data+"]"; });
    }

    // �������� ������������ ��������
  $scope.update = function (company){
       $http.put("/rest/json/company/"+company.ID,company)
        .success(function(data){$scope.alertzone="�������� �������� "+company.Name;}).error(function(data,status){ // ������� alert(....); �� alertzone
        $scope.alertzone="["+status+"] ������ ���������� ����� �������� :( ["+data+"]"; });
    }

    // ������� ��������
    $scope.delete = function (company){
        $http.delete("/rest/json/company/"+company.ID)
        .success(function(data){$scope.getCompanies();$scope.alertzone="������� �������� "+company.Name;}).error(function(data,status){
            $scope.alertzone="["+status+"] ������ �������� �������� :( ["+data+"]"; });
    }
};
