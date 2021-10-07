import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Post} from './entity/Post';

createConnection().then(async connection => {
    const posts = await connection.manager.find(Post);
    if (posts.length === 0) {
        await connection.manager.save(new Array(100).fill(0).map((item, index) => {
            return new Post({title:`Post ${index + 1}`,content: `第${index + 1}篇文章`});
        }));
        console.log('填充完毕');
    }
    connection.close();
}).catch(error => console.log(error));
