// @ts-ignore
const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

const {Transform} = require('stream');
const crypto = require("crypto")
// 压缩进度条
// fs.createReadStream(file)
//     .pipe(zlib.createGzip())
//     .on('data',()=>process.stdout.write("."))
//     .pipe(fs.createWirteStream(file+".zz"))
//     .on('finish',()=>{console.log('Done')})

const reportProgress = new Transform({
    transform(chunk, encoding, callback) {
        process.stdout.write('.');
        callback(null, chunk); // => this.push(chunk)
    }
});

fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(crypto.createCipheriv("aes192","123456"))
    .pipe(reportProgress)
    .pipe(fs.createWirteStream(file + '.zz'))
    .on('finish', () => {console.log('Done');});