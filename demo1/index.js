const db = require('./db')
const inquirer = require("inquirer");


function getTaskChoices(result) {
    return [{name: '创建任务', value: -2}, ...result?.map((task, index) => {
        return {
            name: `${index + 1} - ${task.title} - ${task.done ? '完成' : '未完成'}`,
            value: index
        }
    }), {name: 'quit', value: -1}];
}

function getOperationChoices() {
    return [
        {name: 'quit', value: 'quit'},
        {name: '已完成', value: 'markAsDone'},
        {name: '未完成', value: 'markAsUndone'},
        {name: '修改标题', value: 'update'},
        {name: '删除', value: 'remove'}
    ];
}

function markAsDone(list, index) {
    list[index].done = true
    db.write(list)
}

function markAsUnDone(list, index) {
    list[index].done = false
    db.write(list)
}

function updateTitle(list, index) {
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: '新的标题'
    }]).then(({title}) => {
        list[index].title = title
        db.write(list)
    });
}

function remove(list, index) {
    list.splice(index, 1)
    db.write(list)
}

function operationTask(result, index) {
    const actions = {markAsDone, markAsUnDone, updateTitle, remove}
    inquirer
        .prompt([
            {
                type: 'list', name: 'action',
                message: '请选择要进行的操作?', choices: getOperationChoices(),
            },
        ])
        .then((answers2) => {
            const action = actions[answers2.action]
            action?.(result, index)
        });
}

function createTask(result) {
    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: '新的任务'
    }]).then(({title}) => {
        result.push({title, done: false})
        db.write(result)
    });
}

function printTasks(result) {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'index',
                message: '请选择要操作的任务?',
                choices: getTaskChoices(result),
            },
        ])
        .then((answers) => {
            const index = answers.index
            if (index >= 0) {
                operationTask(result, index);
            } else if (index === -2) {
                createTask(result);
            }
        });
}

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
    printTasks(result);
}

module.exports.add = async (title) => {
    const lst = await db.read()
    lst.push({title, done: false})
    let result
    try {
        result = await db.write(lst)
    } catch (e) {
        result = []
    }
    return result
}

module.exports.clear = async () => {
    await db.write([])
}