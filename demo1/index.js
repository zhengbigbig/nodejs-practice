const db = require('./db')
const inquirer = require("inquirer");


module.exports.read = async () => {
    /*
    1. 读取之前的任务
    2. 往里面加一个title任务
    3. 存储任务到文件
     */
    let result
    try {
        result = await db.read()
    } catch (e) {
        result = []
    }
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择要操作的任务?',
                choices: [{name: '创建任务', value: -2}, ...result?.map((task, index) => {
                    return {
                        name: `${index + 1} - ${task.title} - ${task.done ? '完成' : '未完成'}`,
                        value: index
                    }
                }), {name: 'quit', value: -1}],
            },
        ])
        .then((answers) => {
            const index = answers.index
            if (index >= 0) {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: '请选择要进行的操作?',
                            choices: [
                                {name: 'quit', value: 'quit'},
                                {name: '已完成', value: 'markAsDone'},
                                {name: '未完成', value: 'markAsUndone'},
                                {name: '修改标题', value: 'update'},
                                {name: '删除', value: 'remove'}
                            ],
                        },
                    ])
                    .then((answers2) => {
                        switch (answers2.action) {
                            case 'markAsDone':
                                result[index].done = true
                                db.write(result)
                                break;
                            case 'markAsUndone':
                                result[index].done = false
                                db.write(result)
                                break
                            case 'update':
                                inquirer.prompt([{
                                    type: 'input',
                                    name: 'title',
                                    message: '新的标题'
                                }]).then(({title}) => {
                                    result[index].title = title
                                    db.write(result)
                                });
                                break
                            case 'remove':
                                result.splice(index, 1)
                                db.write(result)
                                break
                            default:
                                break

                        }
                    });
            } else if (index === -1) {

            } else if (index === -2) {
                inquirer.prompt([{
                    type: 'input',
                    name: 'title',
                    message: '新的任务'
                }]).then(({title}) => {
                    result.push({title, done: false})
                    db.write(result)
                });
            }
        });
}

module.exports.add = async (title) => {
    const lst = await db.read()
    lst.push({title, done: false})
    let result
    try {
        result = await db.write(lst)
    } catch (e) {
        console.log(e);
        result = []
    }
    return result
}

module.exports.delete = async (title) => {
    const lst = await this.read(path)
    const results = lst?.filter(d => d !== title)
    let result
    try {
        result = await db.write(results)
    } catch (e) {
        console.log(e);
        result = []
    }
    return result
}

module.exports.clear = async () => {
    await db.write([])
}