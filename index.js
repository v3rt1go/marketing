var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./public');

require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    console.log(file);
    file.serve(request, response);
  }).resume();
  // response.write("Foo");
  // response.end();
}).listen(8081);
