function ctrl($scope,$http) {
    $scope.setPageToRed = function (){
    human.TypeOfUser = "teacher";
    document.getElementById("mainDiv").setAttribute("class", "mainBlockTeacher");
}
    $scope.setPageToGreen = function (){
    human.TypeOfUser = "student";
    document.getElementById("mainDiv").setAttribute("class", "mainBlock");
}
    $scope.postData = function (human){
       if (human.TypeOfUser == null) human.TypeOfUser = "student"; $("#login_result").removeClass().addClass('process').text('Проверка....').fadeIn(1000);
       $http.post("/rest/json/postdata",human)
       .success(function(){$scope.getAccess();}).error(function(status) {
           $("#login_result").fadeTo(200,0.1,function(){
						$(this).html('Нет связи с сервером.').removeClass().addClass('error').fadeTo(900,1);
					});
       });
    };

    $scope.getAccess=function() {
       $http.get("/rest/json/getaccess").success(function(data) {
             $("#login_result").fadeTo(200,0.1,function() {
					$(this).html('Редирект.....').removeClass().addClass('success').fadeTo(900,1,
						function() {
							document.location=data;
						});
					});

       }).error(function(status) {
           $("#login_result").fadeTo(200,0.1,function(){
						$(this).html('Логин неверен ...').removeClass().addClass('error').fadeTo(900,1);
					});
       });
   };
}
