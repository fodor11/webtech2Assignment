var signInApp = angular.module('SignIn', []);
signInApp.controller('SignInCtrl', function ($scope) {
    $scope.emailAddress = "";
    $scope.password = "";
    $scope.emailExists = 0;

    $scope.checkExistingEmail = function () {
        if ($scope.emailExists) {
            $scope.emailExists = 0;
        }
        else {
            $scope.emailExists = 1;
        }
    };

    $scope.login = function () {
        //alert(" login email: " + $scope.emailAddress + "\n password: " + $scope.password);
    };
    $scope.register = function () {
        //alert("register email: " + $scope.emailAddress + "\n password: " + $scope.password);
    };

});