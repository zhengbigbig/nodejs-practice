#!/usr/bin/env node
const program = require("commander");
const api = require('./index.js')
const pkg = require('./package.json')

program
    .option('-n, --name', 'whats your name')

program
    .version(pkg.version)
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(0, -1).join(' ');
        api.add(words).then(() => {
            console.log('add successful')
        }, () => {
            console.log('add failed')
        })
    });

program
    .command('clear')
    .description('clear a task')
    .action(() => {
        void api.clear()
    });

program.parse(process.argv);

if (process.argv.length === 2) {
    void api.read()
}