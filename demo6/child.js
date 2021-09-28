process.on('message', (m) => {
    console.log('CHILD get message:', m);
})

process.send({foo: 'bar'})