import http, { IncomingMessage, ServerResponse } from 'http';

const port = 4000;

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, world!');
    console.log('Server responded with "Hello, world!"');
  }
);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});