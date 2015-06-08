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

function ctrl($scope, $http) {
    // Запрос GET к RESTful web API
    $scope.getCompanies = function () {

    };

    // Создать новую компанию
    $scope.create = function (company) {
        objName = company;
        objName = {
            name: company.name,
            surname: company.surname,
            jobTitle: company.jobTitle,
            workPlace: company.workPlace,
            password: company.password,
            login: company.login,
            email: company.email,
            projects: ["Default"+encode(company.surname)]
        }
        $http.post("http://localhost:57772/csp/rest/json/company", encodeUser(objName))
            .success(function (data) {
            var jsonst = JSON.stringify(objName);
            alert(jsonst);
            $.session.set('session', jsonst);
            $.session.set('project', objName.projects[0]);
                //var user = JSON.parse($.cookie("session"));
                //var proj = JSON.parse($.cookie("project"));
                var url = "http://localhost:57772/csp/user/git/pg/workenv.html";
                window.location = url;
                //$scope.submitLogin(objName);
            }).error(function (data, status) {
                alert("hnnane");
                $scope.submitLogin(objName);

            });
    }

    // Обновить существующую компанию
    $scope.update = function (company) {
        $http.put("/rest/json/company/" + company.ID, company)
            .success(function (data) {
                $scope.alertzone = "Обновили компанию " + company.Name;
            }).error(function (data, status) { // поменял alert(....); на alertzone
                $scope.alertzone = "[" + status + "] Ошибка обновления имени компании :( [" + data + "]";
            });
    }

    // Удалить компанию
    $scope.delete = function (company) {
        $http.delete("/rest/json/company/" + company.ID)
            .success(function (data) {
                $scope.getCompanies();
                $scope.alertzone = "Удалили компанию " + company.Name;
            }).error(function (data, status) {
            });
    }

    $scope.submitLogin = function (objName) {
        var url = "";
        if (objName == undefined) {
        var serverURL = "http://localhost:57772/csp/rest/json/accounts";
        url = serverURL + '/' + this.login + '/' + encode(this.password);
        }
        else {

            var serverURL = "http://localhost:57772/csp/rest/json/accounts";
            url = serverURL + '/' + objName.login + '/' + encode(objName.password);
        }
        var responsePromise = $http.get(url);
        alert(url);
        responsePromise.error(function () {
            window.alert('error');
            console.log(arguments);
        });

        responsePromise.success(function (data) {
            if (Object.keys(data.children).length > 0) {

                $.session.set('session', JSON.stringify(data.children[0]));
                var dataArr = data.children[0].projects;
                if (dataArr.toString().indexOf("\r\n")>-1) {
                    dataArr = dataArr.split("\r\n");
                }
                else {
                    var arr = new Array();
                    arr.push(dataArr.toString());
                    dataArr = arr;
                }
                $.session.set('project', dataArr[0]);
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
};
