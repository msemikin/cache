/*FANTOM DATA*/
var app = angular.module("db", [], function($locationProvider) {
    $locationProvider.html5Mode(true);
});
// app.controller("guicontroller", ["$scope", function ($scope) {
//     $scope.hideAttrs = function () {
//         $(".attr-box").css("visibility", "hidden");
//     }
//     $scope.showAttrs = function () {
//         $(".attr-box").css("visibility", "visible");
//     }
//     $scope.init = function () {
//         $scope.hideAttrs();
//     }
//     $scope.showAttrsInDiv = function (obj) {
//         $scope.selected = obj;
//         $scope.showAttrs();
//     }
//     $scope.tab = 2;
//
//     $scope.user = {
//         FullName: "Анатолий Иваныч"
//     };
//     $scope.objects = [
//         {
//             AttrCount: 111,
//             Name: "Hockey puck",
//             attributes: [{
//                 Name: "attr"
//             }]
//         },
//         {
//             AttrCount: 22,
//             Name: "Golf club"
//         },
//         {
//             AttrCount: 31,
//             Name: "Baseball bat"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         },
//         {
//             AttrCount: 4,
//             Name: "Lacrosse stick"
//         }
// 		];
//
//             }]);


app.controller("setprojects", ["$scope", function($scope) {
    $scope.projects = [{
        DateOfLastChange: 111,
        Title: "Hockey puck"
    }, {
        DateOfLastChange: 22,
        Title: "Golf club"
    }, {
        DateOfLastChange: 31,
        Title: "Baseball bat"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Name: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }, {
        DateOfLastChange: 4,
        Title: "Lacrosse stick"
    }];
}]);

(function($) {
    $(document).ready(function() {
        //$('#cssmenu').prepend('<div id="menu-button">Menu</div>');
        $('#cssmenu #menu-button').on('click', function() {
            var menu = $(this).next('ul');
            if (menu.hasClass('open')) {
                menu.removeClass('open');
            } else {
                menu.addClass('open');
            }
        });
    });
})(jQuery);