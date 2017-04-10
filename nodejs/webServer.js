var express = require('express');
var app = express();
var path = require('path');

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

/// --------------------------------------- Get files from directories --------------------------------------- ///
app.get('/:filename', function (req, res) {
    res.sendFile(path.join(__dirname, '../webapp', req.params.filename));
})
app.get('/:dir/:filename', function (req, res) {
    res.sendFile(path.join(__dirname, '../webapp/' + req.params.dir, req.params.filename));
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Webserver listening at http://%s:%s", host, port)
})
