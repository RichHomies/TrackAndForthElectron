var compression = require('compression');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');
var path = require('path');
var r = require('./db');


var initServer = function() {
  // attaches all the routes to the server
  var port = process.env.PORT || 8081;
  server.listen(port);
  // var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
}

io.on('connection', function(socket) {
  console.log('we connected on server!')

  socket.on('fetchAndUpdateMessages', function() {
    r.table('message')
      .orderBy({index: 'timeCreated'})
      .coerceTo('array')
      .run(r.conn)
      .then(function (messages) {
       messages.forEach(function (message) {
        socket.emit('message', message);
       });
      });
  // Listen to new message being inserted
    r.connect({
      host: 'localhost',
      port: 28015,
      db: 'trackAndForth'
    })
      .then(function (conn) {
        r.table('message')
          .changes().run(conn)
          .then(function(cursor) {
            cursor.each(function (err, row) {
              socket.emit('message', row.new_val);
            }, function () {
              console.log('Finished');
            });
          });
      }); 
  })
  //insert a new message
  socket.on('newMessage', function (messageObj) {
      r.table('message').insert({
        body: messageObj.text,
        userName: 'Zack',
        userID: 1,
        timeCreated: (new Date()).getTime(),
        messageID: 1,
        roomName: 'Test',
        roomID: 1,
        type: 'Text',
        votes: 0
      }).run(r.conn, function(err, result) {
        if (err) {
          throw err
        }
        console.log(JSON.stringify(result))
      });
    });
})

app.use(compression());
app.use(cors());
app.use(morgan('tiny'));
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));


initServer();
exports.app = app;