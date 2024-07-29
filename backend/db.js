import mysql from "mysql"

export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'zz11rr22',
    database:'blog'
});