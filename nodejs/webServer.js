var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

/// --------------------------------------- ""Database"" --------------------------------------- ///
var usersArray =
    [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: 50, loggedIn: false, owned: [2, 3, 4] },
    { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "male", age: 24, loggedIn: false, owned: [1, 5, 6, 7] }];

var booksArray =
    [{ id: 1, title: "How not to fck shit up", author: 1, genre: "education", quantity: 4, requests: [] },
    { id: 2, title: "How to do nothing", author: 2, genre: "freetime", quantity: 0, requests: [] },
    { id: 3, title: "Cpp reference", author: 3, genre: "education", quantity: 2, requests: [] },
    { id: 4, title: "Avoiding dog crap on the sidewalk", author: 1, genre: "education", quantity: 7, requests: [2] },
    { id: 5, title: "Finding dog crap in the park", author: 2, genre: "education", quantity: 6, requests: [] },
    { id: 6, title: "Me neither", author: 4, genre: "drama", quantity: 10, requests: [1] },
    { id: 7, title: "Last time i got up late...", author: 4, genre: "action", quantity: 8, requests: [1] }];

var authorsArray =
    [{ id: 1, name: "Life itself" },
    { id: 2, name: "Dumass" },
    { id: 3, name: "unknown" },
    { id: 4, name: "definitely not me" }];



/// --------------------------------------- DB functions --------------------------------------- ///
function generateUserId() {
    var newId = 0;
    var usersLength = usersArray.length;
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].id > newId) {
            newId = usersArray[i].id;
        }
    }
    newId = newId + 1;
    return newId;
}

function generateBookId() {
    var newId = 0;
    var booksLength = booksArray.length;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id > newId) {
            newId = booksArray[i].id;
        }
    }
    newId = newId + 1;
    return newId;
}

function generateAuthorId() {
    var newId = 0;
    var authorsLength = authorsArray.length;
    for (var i = 0; i < authorsLength; i++) {
        if (authorsArray[i].id > newId) {
            newId = authorsArray[i].id;
        }
    }
    newId = newId + 1;
    return newId;
}


/// --------------------------------------- Homepage --------------------------------------- ///
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../webapp', 'index.html'));
})

/// --------------------------------------- Get data --------------------------------------- ///
app.get('/getUsers', function (req, res) {
    res.json(usersArray);
})
app.get('/getUserByEmail/(:email|*)', function (req, res) {
    var email = req.params.email;
    var usersLength = usersArray.length;
    var userToReturn = { id: 0, name: "", email: "", password: "" };
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].email == email) {
            userToReturn = usersArray[i];
        }
    } 
    setTimeout(function () { res.json(userToReturn); }, 1000);
})
app.get('/getUserById/(:id|*)', function (req, res) {
    var id = parseInt(req.params.id);
    var usersLength = usersArray.length;
    var userToReturn = { id: 0, name: "", email: "", password: "" };
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].id == id) {
            userToReturn = usersArray[i];
        }
    }
    res.json(userToReturn);
})
app.get('/getLoggedInUser', function (req, res) {
    var userToReturn = { id: 0, name: "", email: "", password: "", loggedIn: false };
    var usersLength = usersArray.length;
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].loggedIn == true) {
            userToReturn = usersArray[i];
            break;
        }
    }
    res.json(userToReturn);
})

app.get('/getBooks', function (req, res) {
    res.json(booksArray);
})
app.get('/getRequestedBooks', function (req, res) {
    var requestedBooks = [];
    var booksLength = booksArray.length;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].requests.length != 0) {
            requestedBooks.push(booksArray[i]);
        }
    }
    res.json(requestedBooks);
})

app.get('/getBookById/(:id|*)', function (req, res) {
    var id = req.params.id;
    var booksLength = booksArray.length;
    var bookToReturn = { id: 0, title: "", author: 0, genre: "", quantity: 0, requests: [] };
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id == id) {
            bookToReturn = booksArray[i];
        }
    }
    res.json(bookToReturn);
})

app.get('/getAuthors', function (req, res) {
    res.json(authorsArray);
})
app.get('/getAuthorById/(:id|*)', function (req, res) {
    var id = req.params.id;
    var authorsLength = authorsArray.length;
    var authorToReturn = { id: 0, name: "" };
    for (var i = 0; i < authorsLength; i++) {
        if (authorsArray[i].id == id) {
            authorToReturn = authorsArray[i];
        }
    }
    res.json(authorToReturn);
})



/// --------------------------------------- Post data --------------------------------------- ///
app.post('/addUser', function (req, res) {
    var newUser = req.body;
    newUser.id = generateUserId();
    usersArray.push(newUser);
    res.json(newUser);
})

app.post('/updateUser', function (req, res) {
    var updatedUser = req.body;
    var usersLength = usersArray.length;
    var userToReturn;
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].id == updatedUser.id) {
            usersArray[i] = updatedUser;
            userToReturn = usersArray[i];
        }
    }
    res.json(userToReturn);
})

app.post('/login/:id', function (req, res) {
    var id = req.params.id;
    var usersLength = usersArray.length;
    var userToReturn = { id: 0, name: "", email: "", password: "", type: "", gender: "", age: 0, loggedIn: false };
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].id == id) {
            usersArray[i].loggedIn = true;
            userToReturn = usersArray[i];
        }
    }
    res.json(userToReturn);
})

app.post('/logout/:id', function (req, res) {
    var id = req.params.id;
    var usersLength = usersArray.length;
    var userToReturn = { id: 0, name: "", email: "", password: "", type: "", gender: "", age: 0, loggedIn: false };
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].id == id) {
            usersArray[i].loggedIn = false;
        }
    }
    res.json(userToReturn);
})

app.post('/addBook', function (req, res) {
    var newBook = req.body;
    newBook.id = generateBookId();
    booksArray.push(newBook);
    res.json(newBook);
})
app.post('/addInstance/:bookId/:quantity', function (req, res) {
    var bookId = parseInt(req.params.bookId);
    var quantity = parseInt(req.params.quantity);
    var booksLength = booksArray.length;
    var found = false;
    var bookToReturn;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id == bookId) {                                // find book
            booksArray[i].quantity += quantity;
            bookToReturn = booksArray[i];
            break;
        }
    }
    if (found) {
        res.json(bookToReturn);
    }
    else {
        res.end('failure');
    }
})

app.post('/addAuthor', function (req, res) {
    var newAuthor = req.body;
    newAuthor.id = generateAuthorId();
    authorsArray.push(newAuthor);
    res.json(newAuthor);
})

app.post('/lendBook/:bookId/to/:userId', function (req, res) {
    var bookId = parseInt(req.params.bookId);
    var userId = parseInt(req.params.userId);
    var booksLength = booksArray.length;
    var found = false;
    var bookToReturn;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id == bookId) {                                // find book

            var requests = booksArray[i].requests;
            var requestsMax = requests.length - 1;
            for (var j = requestsMax; j >= 0; j--) {
                if (requests[j] == userId) {                            //find user request
                    requests.splice(j, 1);
                    booksArray[i].quantity -= 1;
                    usersArray[usersArray.map(function (e) { return e.id; }).indexOf(userId)].owned.push(bookId);
                    found = true;
                    break;
                }
            }
            bookToReturn = booksArray[i];
            break;
        }
    }
    if (found) {
        res.json(bookToReturn);
    }
    else {
        res.end('failure');
    }
})

app.post('/dismissBook/:bookId/from/:userId', function (req, res) {
    var bookId = parseInt(req.params.bookId);
    var userId = parseInt(req.params.userId);
    var booksLength = booksArray.length;
    var found = false;
    var bookToReturn;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id == bookId) {                                // find book

            var requests = booksArray[i].requests;
            var requestsMax = requests.length - 1;
            for (var j = requestsMax; j >= 0; j--) {
                if (requests[j] == userId) {                            //find user request
                    requests.splice(j, 1);
                    found = true;
                    break;
                }
            }
            bookToReturn = booksArray[i];
            break;
        }
    }
    if (found) {
        res.json(bookToReturn);
    }
    else {
        res.end('failure');
    }
})

app.post('/request/:bookId/by/:userId', function (req, res) {
    var bookId = parseInt(req.params.bookId);
    var userId = parseInt(req.params.userId);
    var booksLength = booksArray.length;
    var found = false;
    var bookToReturn;
    for (var i = 0; i < booksLength; i++) {
        if (booksArray[i].id == bookId) {                                // find book
            booksArray[i].requests.push(userId);                         // add request
            bookToReturn = booksArray[i];
            found = true;
            break;
        }
    }
    if (found) {
        res.json(bookToReturn);
    }
    else {
        res.end('failure');
    }
})

/// --------------------------------------- Delete data --------------------------------------- ///
app.delete('/deleteUser/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var found = false;
    var maxIndex = usersArray.length - 1;
    for (var i = maxIndex; i >= 0; i--) {
        if (usersArray[i].id == id){
            usersArray.splice(i, 1);
            found = true;
            break;
        }
    }
    //delete the requests of this user
    var booksLength = booksArray.length;
    for (var i = 0; i < booksLength; i++) {
        var requestIndex = booksArray[i].requests.indexOf(id);
        if (requestIndex != -1) {
            booksArray[i].requests.splice(requestIndex, 1);
        }
    }
    if (found) {
        res.end('success');
    }
    else {
        res.end('failure');
    }
})

app.delete('/deleteBook/:id', function (req, res) {
    var id = req.params.id;
    var found = false;
    var maxIndex = booksArray.length - 1;
    for (var i = maxIndex; i >= 0; i--) {
        if (booksArray[i].id == id) {
            booksArray.splice(i, 1);
            found = true;
            break;
        }
    }
    if (found) {
        res.end('success');
    }
    else {
        res.end('failure');
    }
})

app.delete('/deleteAuthor/:id', function (req, res) {
    var id = req.params.id;
    var found = false;
    var maxIndex = authorsArray.length - 1;
    for (var i = maxIndex; i >= 0; i--) {
        if (authorsArray[i].id == id) {
            authorsArray.splice(i, 1);
            found = true;
            break;
        }
    }
    if (found) {
        res.end('success');
    }
    else {
        res.end('failure');
    }
})


/// ---------------- Get files from directories/or homepage in case path is invalid ---------------- ///
app.get('/*', function (req, res) {
    var fullPath = path.join(__dirname, '../webapp/', req.params[0]);
    
    if (fs.existsSync(fullPath)) {
        res.sendFile(fullPath);
    }
    else {
        //res.sendFile(path.join(__dirname, '../webapp', 'index.html'));
        res.end('<h2>Well, well, what were you trying to reach if i may ask you kindly?</h2> \
                <p>The homepage is right <a href="/">this way</a> sir.</p>');
    }
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Webserver listening at http://%s:%s", host, port)
})
