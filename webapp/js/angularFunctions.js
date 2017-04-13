/// Librarian Application 
var librarianApp = angular.module('librarianApp', ['smoothScroll', 'ngRoute']);

/// ------------------------------------ Routing ------------------------------------ ///
librarianApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'services.html'
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
        templateUrl: 'userSettings.html',
        controller: 'userSettingsCtrl'
    })
    .otherwise({
        templateUrl: 'services.html',
        controller: 'servicesController'
    });
});

/// ------------------------------------ Services ------------------------------------ ///
librarianApp.factory('userService', function ($http, $q) {
    var userServiceInstance = {};

    userServiceInstance.getUserByEmail = function (email) {
        var deferred = $q.defer();
        $http.get("/getUserByEmail/" + email)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
            
        }, function errorCallback(reponse) {
            alert('Could not get user by email :( \n email: ' + email);
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    userServiceInstance.getUsers = function () {
        var deferred = $q.defer();
        $http.get("/getUsers")
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get users :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    userServiceInstance.addNewUser = function (newUser) {
        var deferred = $q.defer();
        $http.post("/addUser", newUser)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not add user :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    userServiceInstance.deleteUser = function (idToDelete) {
        var deferred = $q.defer();
        $http.delete("/deleteUser/" + idToDelete)
        .then(function successCallback(response) {
            deferred.resolve(response);
        }, function errorCallback(reponse) {
            alert('Could not delete user :(');
            return deferred.reject(response);
        });
        return deferred.promise;
    }

    return userServiceInstance;
});

/// ------------------------------------ Controllers ------------------------------------ ///
librarianApp.controller('librarianController', function ($scope, userService, $http) {
    $scope.actualUser = { id: 0, name: "Anonymous", email: "", password: "", type: "borrower", gender: "none", age: "0" };
    $scope.users = [];

    userService.getUsers()
    .then(function (result) {
        $scope.users = result;
    });
});

/// Sign in
librarianApp.controller('signInCtrl', function ($scope, $location, userService, $http) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = false;
    $scope.incorrectPassword = false;

    $scope.librarian = false;
    $scope.borrower = false;

    $scope.loggedIn = false;
    $scope.responseArrived = true;

    $scope.checkExistingEmail = function () {
        if ($scope.signForm.emailAdd.$valid) {
            $scope.emailExists = false;
            $scope.responseArrived = false;
            userService.getUserByEmail($scope.emailAddress)
            .then(function (result) {
                $scope.$parent.actualUser = result;
                if ($scope.$parent.actualUser.id != 0) {
                    $scope.emailExists = true;
                }
                $scope.responseArrived = true;
            });
        }
    };

    $scope.login = function () {
        if ($scope.password == $scope.$parent.actualUser.password && $scope.signForm.emailAdd.$valid) {
            $scope.loggedIn = true;
            $scope.incorrectPassword = false;
            if ($scope.$parent.actualUser.type == "borrower") {
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
            var newUser = { id: 0, name: "Anonymous", email: $scope.emailAddress, password: $scope.password, type: "borrower", gender: "none", age: "0" };
            $scope.responseArrived = false;
            userService.addNewUser(newUser)                     //ADD NEW USER
            .then(function (result) {
                $scope.$parent.actualUser = result;

                userService.getUsers()                          //UPDATE USERS
                .then(function (result) {
                    $scope.$parent.users = result;
                    $scope.responseArrived = true;
                    $scope.login();                             //LOGIN
                });
            });
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
        $scope.$parent.actualUser.id = 0;
        $location.path("/");
    }
});

/// User settings
librarianApp.controller('userSettingsCtrl', function ($scope, userService) {
    $scope.deleteUser = function(id) {
        userService.deleteUser(id)
        .then(function () {
            //TODO: update users, logout, homepage
        });
    }
});

