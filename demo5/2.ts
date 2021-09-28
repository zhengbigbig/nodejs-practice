import * as http from 'http';
import {Buffer} from 'buffer';

const fs = require('fs');

const server = http.createServer();
server.on('request', (request, response) => {
    fs.readFile('./test.txt', ((err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) throw err;
        response.end(data);
        console.log('done');
    }));
});

server.listen(8888);