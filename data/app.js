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

app.get("/install", (req, res) => {
    let message = "Table created successfully";

    let createProducts = `CREATE TABLE if not exists Products(
    product_id int auto_increment,
    product_name varchar(255) not null,
    product_password varchar(255) not null,
    product_email varchar(255) not null,
    PRIMARY KEY (product_id)
    )`;


    connection.query(createProducts, (err, results, fields) => {
        if (err) console.log(err);
    })

    res.end(message);

});