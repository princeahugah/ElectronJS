const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router = require('./router');
const PORT = 80;
const acceptedMethods = {
  'users/auth': ['POST'],
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  path = path === '' ? 'home' : path;

  const headers = req.headers;
  const decoder = new StringDecoder('utf-8');

  let body = '';
  req.on('data', (chunk) => {
    body += decoder.write(chunk);
  });

  req.on('end', () => {
    body += decoder.end();
    if (acceptedMethods[path] && acceptedMethods[path].includes(req.method)) {
      const response = router.execute(path, {
        headers,
        body,
      });

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(405);
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(
      `ElectronApp server listening on port ${server.address().port} `,
      `with pid ${process.pid}`
  );
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('Address is already in use');
  } else {
    console.log('Error', err);
  }
});
