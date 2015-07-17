var projects = new Array();

window.onload = function () {
    var json = $.session.get('session');
    if (json != undefined) {
        user = JSON.parse($.session.get('session'));
    }
    else {
        document.location.href="../index.html";
    }
	document.getElementById("userNameText").innerHTML = decode(user.name) + " " + decode(user.surname);
    getAllProjects();
}

function getAllProjects() {
    var mas =  user.projects;
    if (typeof mas == 'string' || mas instanceof String) {
        if (mas.toString().indexOf("\n") > -1) {
            mas = mas.split("\n");
        }
        else if (mas.toString().indexOf(",") > -1) {
            mas = mas.split(',');
        }
        else {
            var arr = new Array();
            arr.push(mas.toString());
            mas = arr;
        }
        addProject(mas);
        projects.push(mas);
    }
    else {
        mas.forEach(function (item, i, arr) {
            addProject(item);
            projects.push(item);
        });
    }
}
function editProject() {

}
function myFunction(projName) {
    $.session.delete('project');
    $.session.set('project', projName);
    var url = "http://localhost:57772/csp/user/git/pg/workenv.html";
    window.location = url;
}

var cacheApp = angular.module("cache", []);
var app = angular.module("cache");
var objD = new Array();

app.controller("projectController", ['$scope', '$http', function($scope, $http) {
    $scope.getCompanies = function () {

    };


    // Обновить существующую компанию
    $scope.update = function () {
        user.projects = projects;
        $http.put("http://localhost:57772/csp/rest/json/updateuser/" + user.ID, user)
            .success(function (data) {
                $.session.set('session', JSON.stringify(user));
            }).error(function (data, status) { // поменял alert(....); на alertzone
                $scope.alertzone = "[" + status + "] Ошибка обновления имени компании :( [" + data + "]";
            });
    }

    $scope.submitLogin = function () {
        var serverURL = "http://localhost:57772/csp/rest/json/accounts";
        var url = serverURL + '/' + this.login + '/' + encode(this.password);

        var responsePromise = $http.get(url);

        responsePromise.error(function () {
            window.alert('error');
            console.log(arguments);
        });

        responsePromise.success(function (data) {
            if (Object.keys(data.children).length > 0) {
                $.session.set('session', JSON.stringify(data));
                $.session.set('project', JSON.stringify(data.children[0].projects));
                //var user = JSON.parse($.cookie("session"));
                //var proj = JSON.parse($.cookie("project"));
                var url = "http://localhost:57772/csp/user/git/pg/workenv.html";
                window.location = url;
            }
            else {
                alert("Try again");
            }
        });
    };
}]);

//function projectController($scope, $http) {
//
//};
