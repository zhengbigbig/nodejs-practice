import * as http from 'http';

const server = http.createServer();

server.on('request', (request,response) => {
    console.log('请求来了',request);
    response.end('hi');
});

server.listen(8888);