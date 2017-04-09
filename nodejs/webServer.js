var express = require('express');
var app = express();

var usersArray = {
    users:
    [{ id: 1, name: "Marvelous Librarian", email: "li@li.li", password: "li", type: "librarian", gender: "male", age: "50" },
    { id: 2, name: "Marvelous Borrower", email: "bo@bo.bo", password: "bo", type: "borrower", gender: "female", age: "24" }]
};


app.get('/getUsers', function (req, res) {
    res.json(usersArray);
})

app.post('/addUser', function (req, res) {
    
})

app.delete('/deleteUser', function (req, res) {

})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Webserver listening at http://%s:%s", host, port)
})