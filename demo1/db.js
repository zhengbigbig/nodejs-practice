const fs = require('fs')
const homedir = require('os').homedir()
const home = process.env.Home || homedir
const p = require('path')
const dbPath = p.join(home, '.todo')

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path,{flag:'a+'}, (err, data) => {
                let lst = []
                if (err) {
                    reject(err)
                }
                try {
                    lst = JSON.parse(data)
                    resolve(lst)
                } catch (e) {
                    reject(err)
                }
            })
        })
    },
    write(lst, path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(lst), err => {
                reject(err)
            })
            resolve(lst)
        })
    }
}

module.exports = db
