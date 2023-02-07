const http = require('http');
const fs = require('fs');

// Parse database
const databaseRaw = fs.readFileSync('database.json')
const database = JSON.parse(databaseRaw)

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  if (request.url === '/') {
    response.end('Hi from server!');
  } else if (request.url === '/likes') {
    response.end(database.likesCount);
  } else if (request.url === '/update-likes') {
    if (request.method === 'POST') {
      let likesCountUpdated
      const body = []
      request.on('data', (chunk) => {
        body.push(chunk)
      }).on('end', () => {
        likesCountUpdated = Buffer.concat(body).toString()
  
        // Write to database
        database.likesCount = likesCountUpdated
        const databaseRawToWrite = JSON.stringify(database)
        fs.writeFileSync('database.json', databaseRawToWrite)
  
        response.end('Updated likes count: ' + database.likesCount);
      })
    } else {
      response.end('You should make this request with POST instead of GET');
    }
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