const {Readable} = require('stream');


const inStream = new Readable();

inStream.push('ABC');
inStream.push('DEF');

inStream.push(null); // no more data
// inStream.pipe(process.stdout)

// @ts-ignore
inStream.on('data', (chunk) => {
    process.stdout.write(chunk);
});
