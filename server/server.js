var compression = require('compression');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
var path = require('path');

var initServer = function() {
  // attaches all the routes to the server
  var port = process.env.PORT || 8080;
  server.listen(8080);
  // var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}


app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));


initServer();
exports.app = app;