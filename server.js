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

      // Parse database
      const databaseRaw = fs.readFileSync('database.json')
      const database = JSON.parse(databaseRaw)
      // Write to database
      database.likesCount = likesCountUpdated
      const databaseRawToWrite = JSON.stringify(database)
      fs.writeFileSync('database.json', databaseRawToWrite)

      response.end('Updated likes count: ' + database.likesCount);
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