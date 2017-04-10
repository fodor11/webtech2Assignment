var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

/// --------------------------------------- ""Database"" --------------------------------------- ///
var usersArray = {
    users:
    [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: "50" },
    { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "female", age: "24" }]
};

/// --------------------------------------- Homepage --------------------------------------- ///
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../webapp', 'index.html'));
})

/// --------------------------------------- Get data --------------------------------------- ///
app.get('/getUsers', function (req, res) {
    res.json(usersArray);
})

/// --------------------------------------- Add data --------------------------------------- ///
app.post('/addUser', function (req, res) {
    
})

/// --------------------------------------- Delete data --------------------------------------- ///
app.delete('/deleteUser', function (req, res) {

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
