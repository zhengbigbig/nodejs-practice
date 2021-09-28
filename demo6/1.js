const util = require('util')
const child_process = require('child_process')
const {exec} = child_process

// exec('ls', (error, stdout, stderr) => {
//     console.log(error, stdout, stderr);
// })

const child = exec('ls')
child.stdout.on('data', (chunk) => {
    console.log(chunk);
})

child.stderr.on('data', (data) => {
    console.log(data)
})

child.on('close', (code) => {
    console.log(code);
})


const child2 = util.promisify(child)
child2.then(data => {
    console.log(data.stdout)
})

