const http = require('http');
const fs = require('fs');

const router = require('./router');

router.get('/', (req, res) => {
  fs.readFile(__dirname + '/index.html', function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

router.get('/favicon.ico', (req, res) => {
  res.writeHead(200);
  res.end();
});

router.get('/posts', (req, res) => {
  const request = http.get('http://jsonplaceholder.typicode.com/posts', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    resp.on('end', () => {
      res.body = {};
      res.body.data = JSON.parse(data);
      res.writeHead(200);
      res.write(JSON.stringify(res.body));
      res.end();
    });
  })
})

router.post('/', (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    console.log(chunk);
    data += chunk;
  });

  req.on('end', () => {
    res.body = {};
    res.body.data = JSON.parse(data);
    res.writeHead(201);
    res.write(JSON.stringify(res.body));
    res.end();
  });
});

const server = http.createServer((req, res) => {
  const routeHandler = router.route(req);
  if (!routeHandler) {
    router.missingRoute(req, res);
  } else {
    routeHandler(req, res);
  }
});

server.listen(3000, () => 'listening on port 3000');
