const mysql = require("mysql2")
const express = require("express");
const app = express();

app.listen(4000, () => {
    console.log("listening to port 4000")
});

const connection = mysql.createConnection(
    {
        user: "root",
        password: "root",
        host: "localhost",
        database: "node",
    });

connection.connect((err) => {
    if (err) console.log(err);
    else console.log("Connected");
})