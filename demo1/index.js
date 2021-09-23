const fs = require('fs')
const homedir = require('os').homedir()
const home = process.env.Home || homedir
const p = require('path')
const dbPath = p.join(home, '.todo')

module.exports.add = (title) => {
    console.log(title, 111)
    /*
    1. 读取之前的任务
    2. 往里面加一个title任务
    3. 存储任务到文件
     */
    fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
        if (err) {
            console.log(err)
        }
        let list;
        try {
            list = JSON.parse(data.toString())
        } catch (e) {
            list = []
        }
        list.push({
            title,
            done: false
        })
        const str = JSON.stringify(list)
        fs.writeFile(dbPath, str + '\n', (error) => {
            if (error) {
                console.log(error);
            }
        })
    })
}

module.exports.clear = () => {

}