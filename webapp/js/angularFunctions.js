/// Librarian Application 
var librarianApp = angular.module('librarianApp', ['smoothScroll', 'ngRoute']);

/// ------------------------------------Routing------------------------------------ ///
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

/// ------------------------------------Services------------------------------------ ///
librarianApp.factory('userService', function () {
    var userServiceInstance = {};
    userServiceInstance.actualUser = { id: 0, name: "Anonymous", email: "", password: "", type: "borrower", gender: "none", age: "0" };
    userServiceInstance.users = [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: "50" },
                                 { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "female", age: "24" }];
    userServiceInstance.getUserByEmail = function (email) {
        var userToReturn = { id: 0, name: "", email: "", password: "", type: "", gender: "", age: "" };
        angular.forEach(userServiceInstance.users, function (user, key) {
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
    userServiceInstance.addNewUser = function (newUser) {
        userServiceInstance.users.push(newUser);
    }
    userServiceInstance.generateNewId = function () {
        var newId = 0;
        angular.forEach(userServiceInstance.users, function (user, key) {
            angular.forEach(user, function (value, key) {
                if (key == "id") {
                    if (value > newId) {
                        newId = value;
                    }
                }
            });
        });
        newId = newId + 1;
        return newId;
    }
    return userServiceInstance;
});

/// ------------------------------------Controllers------------------------------------ ///
librarianApp.controller('librarianController', function ($scope, $http, userService) {
    angular.element(document).ready(function () {
        $http.get("http://localhost:8081/getUsers")
        .then(function successCallback(data) {
            var getUsers = data.users;
            alert('id: ' + getUsers[0].id + "name: " + getUsers[0].name);
            alert('id: ' + getUsers[1].id + "name: " + getUsers[1].name);
        }, function errorCallback(data) {
            alert('Could not get users :(  -> ' + data);
        });
    });
});

librarianApp.controller('servicesController', function ($scope, userService) {
    $scope.currentUsers = userService.users;
});

/// sign in
librarianApp.controller('SignInCtrl', function ($scope, $location, userService) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = false;
    $scope.incorrectPassword = false;

    $scope.librarian = false;
    $scope.borrower = false;
    $scope.loggedIn = false;

    $scope.user = userService.actualUser;

    $scope.checkExistingEmail = function () {
        $scope.emailExists = false;
        userService.actualUser = userService.getUserByEmail($scope.emailAddress);
        $scope.user = userService.actualUser;
        if (userService.actualUser.id != 0) {
            $scope.emailExists = true;
        }
    };

    $scope.login = function () {
        if ($scope.password == userService.actualUser.password) {
            $scope.loggedIn = true;
            $scope.incorrectPassword = false;
            if (userService.actualUser.type == "borrower") {
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
        if ($scope.signForm.emailAdd.$valid && $scope.signForm.password.$valid) {
            userService.addNewUser({ id: userService.generateNewId(), name: "Anonymous", email: $scope.emailAddress, password: $scope.password, type: "borrower", gender: "none", age: "0" });
            userService.actualUser = userService.getUserByEmail($scope.emailAddress);
            $scope.user = userService.actualUser;
            $scope.login();
        }
    };
    $scope.logout = function () {
        $scope.loggedIn = false;
        $scope.librarian = false;
        $scope.borrower = false;
        $scope.emailAddress = "";
        $scope.password = "";
        $scope.emailExists = false;
        $scope.incorrectPassword = false;
        userService.actualUser.id =  0;
        $scope.user = userService.actualUser;
        $location.path("/");
    }
});