const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const { Client } = require("pg");
require("dotenv").config();

const app = express();

const mustache = mustacheExpress();
mustache.cache = null;
app.engine("mustache", mustache);
app.set("view engine", "mustache");

let port = process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/books", (req, res) => {
  const client = new Client();
  client.connect()
  .then(() => {
    console.log("connected to pg db");
    //Query
    return client.query('SELECT * FROM books');
  })
  .then((results) => {
    console.log('result?', results);
    res.render("book-list", results);
  })
  .catch((err) => {
    console.log('Error:', err);    
    res.send("Something bad happened");
  })
});

app.get("/book/add", (req, res) => {
  res.render("book-form");
});

app.post("/book/add", (req, res) => {
  console.log('Post Body: ', req.body);

  const client = new Client();
  client.connect()
  .then(() => {
    console.log("connected to pg db");
    //Query
    const sql = 'INSERT INTO books (title, authors) VALUES ($1, $2)';
    const params = [req.body.title, req.body.authors];    

    return client.query(sql, params)
  })
  .then((result) => {
    console.log('result?', result);
    res.redirect("/books");
  })
  .catch((err) => {
    console.log('Error:', err);    
    res.redirect("/books");
  })
});

app.post('/books/delete/:id', (req, res) => {
  console.log('deleting book with id: ', req.params.id);

  const client = new Client();
  client.connect()
  .then(() => {
    const sql = 'DELETE FROM books WHERE book_id = $1';
    const params = [req.params.id]
    return client.query(sql, params);
  })
  .then((result) => {
    console.log('deleted ?', result);
    res.redirect("/books");
  })
  .catch((err) => {
    console.log('Error:', err);    
    res.redirect("/books");
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
