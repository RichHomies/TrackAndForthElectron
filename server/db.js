'use strict'
var r = require('rethinkdb');
require('rethinkdb-init')(r);

r.init({
    host: 'localhost',
    port: 28015,
    db: 'trackAndForth'
  }, [
    {
      name: 'message',
      indexes: ['messageID', 'userName', 'userID', 'roomName', 'roomID', 'type', 'body', 'timeCreated', 'votes']
    },
    {
      name: 'user',
      indexes: ['userID', 'userName', 'rooms', 'roomIDs', 'soundCloud']
    },
    {
      name: 'room',
      indexes: ['roomName', 'roomID', 'usernames', 'userIDs']
    }
  ]
)
.then(function (conn) {
  // All tables and indexes have been created
  r.conn = conn
  r.conn.use('trackAndForth')
});
module.exports = r