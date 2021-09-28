const {Writable} = require('stream');

/*
    创建一个Writable Stream
 */
const outStream = new Writable({
    // @ts-ignore
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    }
});

process.stdin.pipe(outStream);

process.stdin.on('data', (chunk) => {
    outStream.write(chunk);
});