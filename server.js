const http = require("http");

http.createServer(function (req, res) {
  console.log(`Just got a request at ${req.url}!`)
  res.write('A server response..! (deploy branch (deploy))');
  res.end();
}).listen(process.env.PORT || 8000);
// TODO: add res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

// just a comment