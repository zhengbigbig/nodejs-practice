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
    const path = new URL(url, 'http://ex.com/');
    if (method === 'GET') {
        const filename = path.pathname.substr(1) || 'index.html';
        fs.readFile(p.resolve(publicDir, filename), (error, data) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    response.statusCode = 404;
                    fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
                        response.end(data);
                    });
                } else {
                    response.statusCode = 500;
                    response.end('服务器繁忙');
                }
            } else {
                response.end(data);
            }

        });
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