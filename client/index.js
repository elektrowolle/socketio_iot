var Faye = require('faye');
var client = new Faye.Client('http://localhost:8000/faye');

client.subscribe('/*', function(message) {
  console.log(Date.now() + ": message", message);
});
