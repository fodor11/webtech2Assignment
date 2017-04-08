/// users
actualUser = { id: 0, email: "", password: "", type: "" };
users = [{ id: 1, email: "li@li.li", password: "su", type: "librarian" },
         { id: 2, email: "bo@bo.bo", password: "bo", type: "borrower" }];

/// Librarian Application 
var librarianApp = angular.module('librarianApp', ['smoothScroll', 'ngRoute']);

librarianApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/listBooks', {
        templateUrl: 'listBooks.htm'
    })
    .otherwise({
        templateUrl: 'services.htm',
        controller: 'servicesController'
    });
    $locationProvider.html5Mode(true);
});

librarianApp.controller('librarianController', function ($scope, $http) {
    angular.element(document).ready(function () {

    });
});

librarianApp.controller('servicesController', function ($scope) {
    
    $scope.currentUsers = [];
    angular.forEach(users, function (user, key) {
        $scope.currentUsers.push({ email: user.email, password: user.password })
    });
});

/// sign in
librarianApp.controller('SignInCtrl', function ($scope) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = 0;

    $scope.checkExistingEmail = function () {
        $scope.emailExists = 0;
        // iterate over users
        angular.forEach(users, function (user, key) {
            /// iterate over a user's data
            angular.forEach(user, function (value, key) {
                if (key == "email") {
                    if (value == $scope.emailAddress) {
                        $scope.emailExists = 1;
                    }
                }
            });
        });
    };

    $scope.login = function () {
        //alert(" login email: " + $scope.emailAddress + "\n password: " + $scope.password);
    };
    $scope.register = function () {
        //alert("register email: " + $scope.emailAddress + "\n password: " + $scope.password);
    };

});