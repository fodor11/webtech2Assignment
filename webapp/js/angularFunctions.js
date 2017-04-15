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

    userServiceInstance.updateUser = function (updatedUser) {
        var deferred = $q.defer();
        $http.post("/updateUser", updatedUser)
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
librarianApp.controller('signInCtrl', function ($scope, $timeout, userService, loginService) {
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
            $timeout(function () {          /// needed so that the default "field required" browser message would not show up
                $scope.emailAddress = "";
                $scope.password = "";
                $scope.emailExists = false;
                $scope.incorrectPassword = false;
            }, 1);
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
        $scope.$parent.logout();
    }
});

/// User settings
librarianApp.controller('userSettingsCtrl', function ($scope, userService) {
    $scope.formData = angular.copy($scope.$parent.actualUser);
    $scope.changes = false;
    $scope.message = "";

    $scope.checkChanges = function () {
        if ($scope.userDetails.$dirty) {
            if ($scope.formData.name != $scope.$parent.actualUser.name ||
            $scope.formData.age != $scope.$parent.actualUser.age ||
            $scope.formData.gender != $scope.$parent.actualUser.gender ||
            $scope.formData.email != $scope.$parent.actualUser.email ||
            $scope.formData.password != $scope.$parent.actualUser.password ||
            $scope.formData.type != $scope.$parent.actualUser.type) {
                $scope.changes = true;
            }
            else {
                $scope.message = "No changes have been done.";
            }
        }
    }

    $scope.save = function () {
        $scope.message = "";
        $scope.changes = false;
        $scope.checkChanges();
        $scope.userDetails.$setPristine();
        if ($scope.userDetails.$valid && $scope.changes)
        {
            userService.updateUser($scope.formData)
            .then(function (result) {
                $scope.$parent.actualUser = result;
                if ($scope.$parent.actualUser.type == "borrower") {
                    $scope.$parent.borrower = true;
                    $scope.$parent.librarian = false;
                }
                else {
                    $scope.$parent.borrower = false;
                    $scope.$parent.librarian = true;
                }
                $scope.message = "All changes have been saved.";
                userService.getUsers()
                .then(function (result) {
                    $scope.$parent.users = result;
                });
            });
        }
    }

    $scope.deleteUser = function(id) {
        userService.deleteUser(id)
        .then(function () {
            userService.getUsers()
            .then(function (result) {
                $scope.$parent.users = result;
                $scope.$parent.logout();
            });
        });
    }
});

