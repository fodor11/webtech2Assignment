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
        redirectTo: '/'
    });
});

/// ------------------------------------ Services ------------------------------------ ///
librarianApp.factory('userService', function ($http, $q) {
    var userServiceInstance = {};

    /// ¡¡¡¡¡¡¡¡¡¡¡¡¡ only for testing purposes ¡¡¡¡¡¡¡¡¡¡¡¡¡
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
    /// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

librarianApp.factory('loginService', function ($http, $q) {
    var loginServiceInstance = {};

    loginServiceInstance.getLoggedInUser = function () {
        var deferred = $q.defer();
        $http.get("/getLoggedInUser")
        .then(function successCallback(response) {
            deferred.resolve(response.data);

        }, function errorCallback(reponse) {
            alert('Could not get logged in user :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    loginServiceInstance.login = function (id) {
        var deferred = $q.defer();
        $http.post("/login/" + id)
        .then(function successCallback(response) {
            deferred.resolve(response.data);

        }, function errorCallback(reponse) {
            alert('Could not log in user :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    loginServiceInstance.logout = function (id) {
        var deferred = $q.defer();
        $http.post("/logout/" + id)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not log out user :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    return loginServiceInstance;
});

/// ------------------------------------ Controllers ------------------------------------ ///
librarianApp.controller('librarianController', function ($scope, userService, loginService, $location) {
    $scope.actualUser = { id: 0, name: "Anonymous", email: "", password: "", type: "borrower", gender: "none", age: "0", loggedIn: false };
    $scope.users = [];
    $scope.librarian = false;
    $scope.borrower = false;
    $scope.loggedIn = false;

    $scope.login = function () {
        loginService.login($scope.actualUser.id)
        .then(function (result) {
            $scope.actualUser = result;
            if ($scope.actualUser.type == "borrower") {
                $scope.borrower = true;
            }
            else {
                $scope.librarian = true;
            }
            $scope.loggedIn = $scope.actualUser.loggedIn;
        });
    }
    $scope.logout = function () {
        loginService.logout($scope.actualUser.id)
        .then(function (result) {
            $scope.librarian = false;
            $scope.borrower = false;
            $scope.loggedIn = false;
            $scope.actualUser.id = 0;
            $scope.actualUser.loggedIn = $scope.actualUser.loggedIn;
            $location.path("/");
        });
    }

    userService.getUsers()
    .then(function (result) {
        $scope.users = result;
    });
    loginService.getLoggedInUser()
    .then(function (result) {
        console.log('get logged in user');
        $scope.actualUser = result;
        if ($scope.actualUser.loggedIn == true) {
            console.log($scope.actualUser.name + 'is logged in');
            $scope.loggedIn = true;
            if ($scope.actualUser.type == "borrower") {
                $scope.borrower = true;
            }
            else {
                $scope.librarian = true;
            }
        }
    });
});

/// Sign in
librarianApp.controller('signInCtrl', function ($scope, userService, loginService) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = false;
    $scope.incorrectPassword = false;

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
            $scope.$parent.login();
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
        $scope.emailAddress = "";
        $scope.password = "";
        $scope.emailExists = false;
        $scope.incorrectPassword = false;

        $scope.$parent.logout();
    }
});

/// User settings
librarianApp.controller('userSettingsCtrl', function ($scope, userService) {
    $scope.deleteUser = function(id) {
        userService.deleteUser(id)
        .then(function () {
            //TODO: update users, logout
            userService.getUsers()                          //UPDATE USERS
            .then(function (result) {
                $scope.$parent.users = result;
                $scope.$parent.logout();
            });
        });
    }
});

