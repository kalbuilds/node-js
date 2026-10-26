const mysql = require("mysql2")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.listen(4000, () => {
    console.log("listening to port 4000")
});

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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

    let createProductDescription = `CREATE TABLE if not exists ProductDescription(
    description_id int auto_increment,
    product_id int(11) not null,
    product_brief_description TEXT not null,
    product_description TEXT not null,
    PRIMARY KEY (description_id), 
    FOREIGN KEY (product_id) REFERENCES
    Products(product_id)
    )`;





    let createProductPrice = `CREATE TABLE if not exists ProductPrice(
    price_id int auto_increment,
    product_id int(11) not null,
    starting_price TEXT not null,
    price_range TEXT not null,
    PRIMARY KEY (price_id), 
    FOREIGN KEY (product_id) REFERENCES
    Products(product_id)
    )`;





    connection.query(createProducts, (err, results, fields) => {
        if (err) console.log(err);
    });
    connection.query(createProductDescription, (err, results, fields) => {
        if (err) console.log(err);
    })
    connection.query(createProductPrice, (err, results, fields) => {
        if (err) console.log(err);
    })

    res.end(message);

});
app.post("/add-products", (req, res) => {
    console.log(req.body);
    res.send("Data received successfully!");
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let price = req.body.StartPrice;
    let range = req.body.priceRange;
    let brief = req.body.briefDescription;
    let full = req.body.fullDescription;

    let sqlAddProducts = "INSERT INTO Products (product_name, product_email, product_password) VALUES (?, ?, ?)";

    connection.query(sqlAddProducts, [name, email, password], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error inserting product");
        }

    });
});