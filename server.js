const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.setHeader('Content-Type', 'text/plain');

  if (request.method === 'POST') {
    let likesCountUpdated
    const body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      likesCountUpdated = Buffer.concat(body).toString()
      fs.writeFile('likesCount.txt', likesCountUpdated, err => {
        if (err) {
          console.error(err);
        }
      });

      response.end('Updated likes count: ' + likesCountUpdated);
    })
  } else {
    response.end('Hello World');
  }
});
const port = 8000;
server.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}/`);
});


// TODO: problems with hosting on render? Paste this instead:
// const http = require("http");

// http.createServer(function (req, res) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
//   res.write('A server response!');
//   res.end();
// }).listen(process.env.PORT || 8000);