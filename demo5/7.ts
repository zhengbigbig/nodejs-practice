// @ts-ignore
const {Readable} = require('stream');


const inStream = new Readable({
    read(size) {
        console.log(this)
        this.push(String.fromCharCode(this.currentCharCode++));
        if (this.currentCharCode > 90) {
            this.push(null);
        }
    }
});

inStream.currentCharCode = 65;
inStream.pipe(process.stdout);