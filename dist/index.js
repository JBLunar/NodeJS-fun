"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const port = 4000;
const server = http_1.default.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello, world!');
    console.log('Server responded with "Hello, world!"');
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
