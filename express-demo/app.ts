import express from 'express';
import {IncomingMessage, ServerResponse} from 'http';

const app = express();
const port = 3000;

app.get('/', (req: IncomingMessage, response: ServerResponse) => {
    response.end('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});