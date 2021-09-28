import * as http from 'http';
import {Buffer} from 'buffer';

const fs = require('fs');

const server = http.createServer();
server.on('request', ((req, res) => {
    const stream = fs.createReadStream('./test.txt');
    stream.pipe(res);
    stream.on('data', (chunk:Buffer) => console.log(chunk));
    stream.on('end', () => console.log('done'));

}));
server.listen(8888);