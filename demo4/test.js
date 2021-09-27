const mariadb = require('mariadb');
require('dotenv').config()
const pool = mariadb.createPool({
    host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PWD,
    database: 'test',
    port: 33060,
    connectionLimit: 5
});
pool.getConnection()
    .then(conn => {
        conn.query("SELECT * from user")
            .then(rows => { // rows: [ {val: 1}, meta: ... ]
                console.log(rows);
                 return conn.query('CREATE DATABASE IF NOT EXISTS test2 CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci')
            })
            .catch(err => {
                console.log(err);
                conn.release(); // release to pool
            })
            .finally(() => {
                conn.release(); // release to pool
            })

    }).catch(err => {
    console.log(err);
    //not connected
});