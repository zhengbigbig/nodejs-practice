const fs = require('fs');

const stream = fs.createWriteStream('./test.txt');
for (let i = 0; i < 1000000; i++) {
    stream.write(`这是第${i}行内容，我们需要很多很多内容，要不停地往文件中写写写\n`);
}
stream.end(); // close stream
console.log('end');