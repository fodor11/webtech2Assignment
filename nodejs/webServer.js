var express = require('express');
var app = express();

// not found
app.get('/*', function (req, res) {
    res.end('<h1>Sorry, the requested page could not be found</h1>');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Webserver listening at http://%s:%s", host, port)
})