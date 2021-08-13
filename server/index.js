const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');

dotenv.config();
const app = express();
app.use(morgan('dev'));

// connect to database
const client = new Client();
client.connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', (req, res) => {
  client
    .query('SELECT * FROM products LIMIT 5')
    .then((results) => res.json(results.rows))
    .catch((e) => console.log(e));
});

app.get('/products/:product_id', (req, res) => {
  const text = `
    SELECT p.product_id, p.name, f.feature, f.value
    FROM products p INNER JOIN features f
    ON f.product_id = p.product_id
    WHERE p.product_id=$1;
  `;
  const values = [req.params.product_id];
  client
    .query(text, values)
    .then((results) => res.json(results.rows))
    .catch((e) => console.log(e));
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
