/// users
actualUser = "none";
users = [{ id: 1, email: "li@li.li", password: "su", type: "librarian" },
         { id: 2, email: "bo@bo.bo", password: "bo", type: "borrower" }];

/// Page ready function
var LibrarianApp = angular.module('librarianApp', ['smoothScroll']);
LibrarianApp.controller('librarianController', function ($scope, $http, $location, $anchorScroll) {
    angular.element(document).ready(function () {
        var menuBar = document.getElementById('navBarMenu');
        var menuItems = menuBar.getElementsByTagName('a');
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].onclick = function (event) {
                event.preventDefault();
                $http.get(this.getAttribute('href')).then(function (response) { document.getElementById('content').innerHTML = response.data; });
                //$location.hash('content');
                //$anchorScroll();
            };
        }
        $http.get('services.html').then(function (response) { document.getElementById('content').innerHTML = response.data; });
    });
});

/// sign in
var signInApp = angular.module('SignIn', []);
signInApp.controller('SignInCtrl', function ($scope) {
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