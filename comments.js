// Create web server
// Listen for incoming requests
// When a request comes in, call the appropriate function
// Send a response to the client

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = require('./comments');

var server = http.createServer(function(request, response) {
  var urlParts = url.parse(request.url);
  if (urlParts.pathname === '/comments') {
    if (request.method === 'GET') {
      comments.get(request, response);
    } else if (request.method === 'POST') {
      comments.add(request, response);
    } else if (request.method === 'DELETE') {
      comments.remove(request, response);
    }
  } else {
    fs.readFile(__dirname + urlParts.pathname, function(err, data) {
      if (err) {
        response.writeHead(404);
        response.end();
      } else {
        response.writeHead(200);
        response.end(data);
      }
    });
  }
});

server.listen(8080);
console.log('Server is listening on port 8080');
