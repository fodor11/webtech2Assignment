/// users
actualUser = { id: 0, name: "Anonymous", email: "", password: "", type: "borrower", gender: "none", age: "0" };
users = [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: "50" },
         { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "female", age: "24" }];
function getUserByEmail(email) {
    var userToReturn = { id: 0, name: "", email: "", password: "", type: "", gender: "", age: "" };
    angular.forEach(users, function (user, key) {
        angular.forEach(user, function (value, key) {
            if (key == "email") {
                if (value == email) {
                    userToReturn = user;
                }
            }
        });
    });
    return userToReturn;
}

/// Librarian Application 
var librarianApp = angular.module('librarianApp', ['smoothScroll', 'ngRoute']);

librarianApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'services.html',
        controller: 'servicesController'
    })
    .when('/manageBooks', {
        templateUrl: 'manageBooks.html'
    })
    .when('/manageInventory', {
        templateUrl: 'manageInventory.html'
    })
    .when('/manageRentals', {
        templateUrl: 'manageRentals.html'
    })
    .when('/listBooks', {
        templateUrl: 'listBooks.html'
    })
    .when('/userSettings', {
        templateUrl: 'userSettings.html'
    })
    .otherwise({
        templateUrl: 'services.html',
        controller: 'servicesController'
    });
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
librarianApp.controller('SignInCtrl', function ($scope, $location) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = false;
    $scope.incorrectPassword = false;

    $scope.librarian = false;
    $scope.borrower = false;
    $scope.loggedIn = false;

    $scope.user = {};

    $scope.checkExistingEmail = function () {
        $scope.emailExists = false;
        $scope.user = getUserByEmail($scope.emailAddress);
        actualUser = $scope.user;
        if ($scope.user.id != 0) {
            $scope.emailExists = true;
        }
    };

    $scope.login = function () {
        //check passwd, set loggedIn & type
        if ($scope.password == $scope.user.password) {
            $scope.loggedIn = true;
            $scope.incorrectPassword = false;
            if ($scope.user.type == "borrower") {
                $scope.borrower = true;
            }
            else {
                $scope.librarian = true;
            }
        }
        else {
            $scope.incorrectPassword = true;
        }
    };
    $scope.register = function () {
        //alert("register email: " + $scope.emailAddress + "\n password: " + $scope.password);
    };
    $scope.logout = function () {
        $scope.loggedIn = false;
        $scope.librarian = false;
        $scope.borrower = false;
        $scope.emailAddress = "";
        $scope.password = "";
        $scope.emailExists = false;
        $scope.incorrectPassword = false;
        $scope.user = { id: "0" };
        actualUser = $scope.user;
        $location.path("/");
    }
});