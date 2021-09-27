import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import {Buffer} from 'buffer';
import * as fs from 'fs';
import * as p from 'path';

const server = http.createServer();
const publicDir = p.relative(__dirname, 'public');

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('请求来了');
    const {method, headers, url} = request;
    const path = new URL(url,'http://ex.com/')
    if (method === 'GET') {
        switch (path.pathname) {
            case '/index.html':
                response.setHeader('Content-Type', 'text/html;charset=utf-8');
                fs.readFile(p.resolve(publicDir, 'index.html'), (error, data) => {
                    if (error) throw error;
                    response.end(data.toString());
                });
                break;
            case '/style.css':
                response.setHeader('Content-Type', 'text/css;charset=utf-8');
                fs.readFile(p.resolve(publicDir, 'style.css'), (error, data) => {
                    if (error) throw error;
                    response.end(data.toString());
                });
                break;
            case '/main.js':
                response.setHeader('Content-Type', 'text/javascript;charset=utf-8');
                fs.readFile(p.resolve(publicDir, 'main.js'), (error, data) => {
                    if (error) throw error;
                    response.end(data.toString());
                });
                break;

        }
    }
    // const arr = [];
    // request.on('data', (chunk: Buffer) => {
    //     arr.push(chunk);
    // });
    // request.on('end', () => {
    //     const body = Buffer.concat(arr).toString();
    //     console.log(body);
    //     response.statusCode = 400;
    //     response.setHeader('X-M', 'lalala');
    //     response.write('1\n');
    //     response.end('hi');
    // });

});

server.listen(8888);