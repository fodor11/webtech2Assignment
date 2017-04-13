var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());

/// --------------------------------------- ""Database"" --------------------------------------- ///
var usersArray = 
    [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: "50" },
    { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "female", age: "24" }];

/// --------------------------------------- DB functions --------------------------------------- ///
function generateId() {
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
    var userToReturn = { id: 0, name: "", email: "", password: "", type: "", gender: "", age: "" };
    for (var i = 0; i < usersLength; i++) {
        if (usersArray[i].email == email) {
            userToReturn = usersArray[i];
        }
    } 
    setTimeout(function () { res.json(userToReturn); }, 1000);
    
})


/// --------------------------------------- Add data --------------------------------------- ///
app.post('/addUser', function (req, res) {
    var newUser = req.body;
    newUser.id = generateId();
    usersArray.push(newUser);
    res.json(newUser);
})

/// --------------------------------------- Delete data --------------------------------------- ///
app.delete('/deleteUser/:id', function (req, res) {
    var id = req.params.id;
    var maxIndex = usersArray.length - 1;
    for (var i = maxIndex; i >= 0; i--) {
        if (usersArray[i].id == id){
            usersArray.splice(i, 1);
            break;
        }
    }
    res.end('success');
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
