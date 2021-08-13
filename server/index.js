const dotenv = require('dotenv');
const express = require('express');
const { Client } = require('pg');

dotenv.config();
const app = express();

// connect to database
const client = new Client();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  res.json('hello from products');
});

app.get('/products/:product_id', (req, res) => {
  res.json(req.params);
});

app.get('/products/:product_id/styles', (req, res) => {
  res.json(req.params);
});

app.get('/products/:product_id/related', (req, res) => {
  res.json(req.params);
});


app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
