//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
var https = require('https');
var http = require('http');
var fs = require('fs');

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('/etc/cert/key.pem'),
  cert: fs.readFileSync('/etc/cert/cert.pem')
};

// Create a service (the app object is just a callback).
var app = express();
app.use(favicon(__dirname + '/dist/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/ping', function(req, res) {
  return res.send('pong');
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Create an HTTP service.
http.createServer(app).listen(80);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);
