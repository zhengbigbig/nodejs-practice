import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import {Buffer} from 'buffer';

const server = http.createServer();

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
    console.log('请求来了');
    console.log(request.method, request.headers, request.url);
    const arr = [];
    request.on('data', (chunk: Buffer) => {
        arr.push(chunk);
    });
    request.on('end', () => {
        const body = Buffer.concat(arr).toString();
        console.log(body);
        response.statusCode = 400;
        response.setHeader('X-M', 'lalala');
        response.write('1\n');
        response.end('hi');
    });

});

server.listen(8888);