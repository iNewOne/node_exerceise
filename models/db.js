const mysql = require('mysql');
const { dbConfig } = require('../config');

const pool = mysql.createPool(dbConfig);

let db = {};

db.q = function (sql, params) {
    // 取出连接
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql,
                params,
                function (err, result) {
                    console.log(`${sql}=>${params}`);
                    // 释放连接
                    connection.release();
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
        });
    })
};

// 导出对象
module.exports = db;