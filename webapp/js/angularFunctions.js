/// Librarian Application 
var librarianApp = angular.module('librarianApp', ['smoothScroll', 'ngRoute', 'ui.bootstrap']);

/// ------------------------------------ Routing ------------------------------------ ///
librarianApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'services.html'
    })
    .when('/manageBooks', {
        templateUrl: 'manageBooks.html',
        controller: 'manageBooksCtrl'
    })
    .when('/manageInventory', {
        templateUrl: 'manageInventory.html',
        controller: 'inventoryCtrl'
    })
    .when('/manageRentals', {
        templateUrl: 'manageRentals.html',
        controller: 'rentalsCtrl'
    })
    .when('/listBooks', {
        templateUrl: 'listBooks.html',
        controller: 'listBooksCtrl'
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
    
    userServiceInstance.getUserById = function (id) {
        var deferred = $q.defer();
        $http.get("/getUserById/" + id)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get user by id :( \n id: ' + id);
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }


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

librarianApp.factory('bookService', function ($http, $q) {
    var bookServiceInstance = {};

    bookServiceInstance.getBooks = function () {
        var deferred = $q.defer();
        $http.get("/getBooks")
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get books :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.getRequestedBooks = function () {
        var deferred = $q.defer();
        $http.get("/getRequestedBooks")
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get requested books :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.getBookById = function (id) {
        var deferred = $q.defer();
        $http.get("/getBookById/" + id)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get book by id :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.addBook = function (book) {
        var deferred = $q.defer();
        $http.post("/addBook", book)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not add book :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.addBookInstance = function (bookId, quantity) {
        var deferred = $q.defer();
        $http.post("/addInstance/" + bookId + "/" + quantity)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not add book instance :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.lendBook = function (bookId, userId) {
        var deferred = $q.defer();
        $http.post("/lendBook/" + bookId + "/to/" + userId)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not lend book :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.dismissBookRequest = function (bookId, userId) {
        var deferred = $q.defer();
        $http.post("/dismissBook/" + bookId + "/from/" + userId)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not delete bookrequest :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.requestBook = function (bookId, userId) {
        var deferred = $q.defer();
        $http.post("/request/" + bookId + "/by/" + userId)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not request book :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    bookServiceInstance.deleteBook = function (bookId) {
        var deferred = $q.defer();
        $http.delete("/deleteBook/" + bookId)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not delete book :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    return bookServiceInstance;
});

librarianApp.factory('authorService', function ($http, $q) {
    var authorServiceInstance = {};

    authorServiceInstance.getAuthors = function () {
        var deferred = $q.defer();
        $http.get("/getAuthors")
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get authors :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    authorServiceInstance.getAuthorById = function (id) {
        var deferred = $q.defer();
        $http.get("/getAuthorById/" + id)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not get author by id :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    authorServiceInstance.addAuthor = function (author) {
        var deferred = $q.defer();
        $http.post("/addAuthor", author)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not add author :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    authorServiceInstance.deleteAuthor = function (authorId) {
        var deferred = $q.defer();
        $http.delete("/deleteAuthor/" + authorId)
        .then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(reponse) {
            alert('Could not delete author :(');
            return deferred.reject(response.data);
        });
        return deferred.promise;
    }

    return authorServiceInstance;
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
        $scope.actualUser = result;
        if ($scope.actualUser.loggedIn == true) {
            //console.log($scope.actualUser.name + ' is logged in');
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
            }, 10);
        }
        else {
            $scope.incorrectPassword = true;
        }
    };

    $scope.register = function () {
        if ($scope.signForm.emailAdd.$valid && $scope.signForm.password.$valid) {
            var newUser = { id: 0, name: "Anonymous", email: $scope.emailAddress, password: $scope.password, type: "borrower", gender: "other", age: 0, loggedIn: false, owned: [] };
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
                if ($scope.formData.age < 0) {
                    $scope.formData.age = $scope.$parent.actualUser.age;
                    $scope.message = "Age must not be less than 0!  ";
                }
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
                $scope.message += "All changes have been saved.";
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

/// List books and request book
librarianApp.controller('listBooksCtrl', function ($scope, bookService, authorService) {
    
    $scope.books = [];

    $scope.order = '+title';
    $scope.orderByTitle = function () {
        if ($scope.order == "+title") {
            $scope.order = "-title";
        }
        else {
            $scope.order = "+title";
        }
    }
    $scope.orderByAuthor = function () {
        if ($scope.order == "+authorName") {
            $scope.order = "-authorName";
        }
        else {
            $scope.order = "+authorName";
        }
    }
    $scope.orderByGenre = function () {
        if ($scope.order == "+genre") {
            $scope.order = "-genre";
        }
        else {
            $scope.order = "+genre";
        }
    }
    $scope.orderByStatus = function () {
        if ($scope.order == "+status") {
            $scope.order = "-status";
        }
        else {
            $scope.order = "+status";
        }
    }
    
    $scope.setStatus = function () {
        var booksLength = $scope.books.length;
        for (var i = 0; i < booksLength; i++) {
            if ($scope.books[i].requests.indexOf($scope.$parent.actualUser.id) != -1) {
                $scope.books[i].status = 'requested';
            }
            else if ($scope.$parent.actualUser.owned.indexOf($scope.books[i].id) != -1) {
                $scope.books[i].status = 'owned';
            }
            else {
                $scope.books[i].status = 'none';
            }
        }
    }
    $scope.setAuthorNames = function () {
        authorService.getAuthors()
        .then(function (result) {
            var booksLength = $scope.books.length;
            for (var i = 0; i < booksLength; i++) {
                $scope.books[i].authorName = result[result.map(function (e) { return e.id; }).indexOf($scope.books[i].author)].name;
            }
        });
    }
    $scope.updateBooks = function () {
        bookService.getBooks()
        .then(function (result) {
            $scope.books = result;
            $scope.setStatus();
            $scope.setAuthorNames();
        });
    }

    $scope.requestBook = function (id) {
        bookService.requestBook(id, $scope.$parent.actualUser.id)
        .then(function () {
            $scope.updateBooks();
        });
    }
    $scope.updateBooks();
});

/// List requests, rent books
librarianApp.controller('rentalsCtrl', function ($scope, bookService, authorService, userService, $uibModal) {
    $scope.books = [];
    $scope.actualbook = {};

    $scope.setAuthorNames = function () {
        authorService.getAuthors()
        .then(function (result) {
            var booksLength = $scope.books.length;
            for (var i = 0; i < booksLength; i++) {
                $scope.books[i].authorName = result[result.map(function (e) { return e.id; }).indexOf($scope.books[i].author)].name;
            }
        });
    }
    $scope.parseUsers = function () {
        userService.getUsers().then(function (users) {
            var booksLength = $scope.books.length;
            for (var i = 0; i < booksLength; i++) {
                $scope.books[i].users = [];
                var usersLength = $scope.books[i].requests.length;
                for (var j = 0; j < usersLength; j++) {
                    var user = users[users.map(function (e) { return e.id; }).indexOf($scope.books[i].requests[j])];
                    $scope.books[i].users.push({ id: user.id, name: user.name});
                }
            }
        });
    }
    $scope.updateBooks = function () {
        bookService.getRequestedBooks()
        .then(function (result) {
            $scope.books = result;
            $scope.setAuthorNames();
            $scope.parseUsers();
        });
    }
    $scope.updateUser = function () {
        userService.getUserById($scope.$parent.actualUser.id)
        .then(function (result) {
            $scope.$parent.actualUser = result;
        });
    }

    $scope.lend = function (bookId, userId) {
        bookService.lendBook(bookId, userId)
        .then(function () {
            var bookIndex = $scope.books.map(function (e) { return e.id; }).indexOf(bookId);
            $scope.books[bookIndex].users.splice($scope.books[bookIndex].users.map(function (e) { return e.id; }).indexOf(userId), 1);
            $scope.books[bookIndex].quantity -= 1;
            if ($scope.books[bookIndex].users.length == 0) {
                $scope.modalObj.dismiss('cancel');
            }
        });
    }
    $scope.dismiss = function (bookId, userId) {
        bookService.dismissBookRequest(bookId, userId)
        .then(function () {
            var bookIndex = $scope.books.map(function (e) { return e.id; }).indexOf(bookId);
            $scope.books[bookIndex].users.splice($scope.books[bookIndex].users.map(function (e) { return e.id; }).indexOf(userId), 1);
            if ($scope.books[bookIndex].users.length == 0) {
                $scope.modalObj.dismiss('cancel');
            }
        });
    }

    $scope.modalObj = {};
    $scope.toggleModal = function (bookId) {
        var bookIndex = $scope.books.map(function (e) { return e.id; }).indexOf(bookId);
        $scope.actualbook = $scope.books[bookIndex];
        $scope.modalObj = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'requestsModal.html',
            scope: $scope,
            appendTo: angular.element(document.querySelector('#tf-service'))
        });
        $scope.modalObj.result.catch(function () {
            $scope.updateBooks();
            $scope.updateUser();
        });
    }
    $scope.updateBooks();
});

/// Add book instance
librarianApp.controller('inventoryCtrl', function ($scope, bookService, authorService) {
    $scope.books = [];
    $scope.setAuthorNames = function () {
        authorService.getAuthors()
        .then(function (result) {
            var booksLength = $scope.books.length;
            for (var i = 0; i < booksLength; i++) {
                $scope.books[i].authorName = result[result.map(function (e) { return e.id; }).indexOf($scope.books[i].author)].name;
            }
        });
    }
    $scope.updateBooks = function () {
        bookService.getBooks()
        .then(function (result) {
            $scope.books = result;
            $scope.setAuthorNames();
            var booksLength = $scope.books.length;
            for (var i = 0; i < booksLength; i++) {
                $scope.books[i].addQuantity = 0;
            }
        });
    }
    $scope.addInstance = function (bookId, quantity) {
        if (quantity > 0) {
            bookService.addBookInstance(bookId, quantity)
            .then(function (result) {
                //doesn't work, no idea why tho
                //$scope.books[$scope.books.map(function (e) { return e.id; }).indexOf(bookId)] = angular.copy(result);
                $scope.updateBooks();
            });
        }
    }
    $scope.updateBooks();
});

librarianApp.controller('manageBooksCtrl', function ($scope, bookService, authorService, $timeout) {
    $scope.newBook = { id: 0, title: "", author: 0, genre: "", quantity: 0, requests: [] };
    $scope.newAuthor = { id: 0, name: "" };
    $scope.successMessage = "";
    $scope.authors = [];
    $scope.books = [];

    $scope.titleFieldMissing = false;
    $scope.genreFieldMissing = false;
    $scope.nameFieldMissing = false;

    $scope.updateBooks = function () {
        bookService.getBooks()
        .then(function (result) {
            $scope.books = result;
        });
    }
    $scope.updateAuthors = function () {
        authorService.getAuthors()
        .then(function (result) {
            $scope.authors = result;
            $scope.newBook.author = $scope.authors[0].id;
        });
    }
    $scope.addBook = function () {
        if ($scope.addBookForm.$valid && $scope.newBook.quantity >= 0) {
            bookService.addBook($scope.newBook);
            $timeout(function () {          /// needed so that the default "field required" browser message would not show up
                $scope.newBook = { id: 0, title: "", author: 0, genre: "", quantity: 0, requests: [] };
                $scope.newBook.author = $scope.authors[0].id;
            }, 10);
            $scope.successMessage = "Book successfully saved!";

            $scope.titleFieldMissing = false;
            $scope.genreFieldMissing = false;
            $scope.addBookForm.$setPristine();
        }
        else {
            $scope.successMessage = "Could not save book, some required fields are empty or not valid";
            if ($scope.newBook.title == "") {
                $scope.titleFieldMissing = true;
            }
            else if ($scope.newBook.genre == "") {
                $scope.genreFieldMissing = true;
            }
            else if ($scope.newBook.quantity < 0) {
                $scope.quantityFieldMessage = true;
            }
        }
    }
    $scope.addAuthor = function () {
        if ($scope.addAuthorForm.$valid) {
            authorService.addAuthor($scope.newAuthor);
            $timeout(function () {          /// needed so that the default "field required" browser message would not show up
                $scope.newAuthor.name="";
            }, 10);
            $scope.successMessage = "Author successfully saved!";
            $scope.nameFieldMissing = false;
            $scope.addAuthorForm.$setPristine();
            $scope.updateAuthors();
        }
        else {
            $scope.successMessage = "Could not save author, name is missing";
        }
    }

    $scope.updateAuthors();
    $scope.updateBooks();
});