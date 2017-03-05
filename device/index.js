//var socket = require("socket.io-client")("http://192.168.1.157:3000");

var Faye = require('faye');
var client = new Faye.Client('http://192.168.1.157:8000/faye', {retry: 10});

client.subscribe('/messages', function(message) {
  console.log('Got a message: ' + message.text);
});

var sp = require("serialport").SerialPort;
var port = new sp("/dev/ttyS0", {baudrate:115200});

//  socket.on('connect', function(){console.log("connected")});
//  socket.on('event', function(data){console.log("data", data)});
//  socket.on('disconnect', function(){console.log("disconnectd")});

port.on('open', function() {
  console.log("open serial");
  port.on('data', function (data) {
//    socket.broadcast.emit('blink', {d:""+data});
    client.publish('/blink', {d: data}, {deadline: 10, attempts: 3});
    console.log('Data: ' + data);
  });

});
