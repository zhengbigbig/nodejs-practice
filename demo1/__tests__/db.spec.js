const db = require('../db')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    afterEach(() => {
        fs.clearMocks()
    })
    // 测试读文件
    it('can read', async () => {
        fs.setReadFileMock('/xxx', null, JSON.stringify([{title: 'hi', done: true}]))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual([{title: 'hi', done: true}])
    })
    // 测试写文件
    it('can write', async () => {
        let fakeFile = ''
        fs.setWriteFileMock('/yyy', (path, data) => {
            fakeFile = data
        })
        const lst = [{title: 'x', done: true}, {title: 'y', done: true}]
        await db.write(lst, '/yyy')
        expect(fakeFile).toBe(JSON.stringify(lst))
    })
})