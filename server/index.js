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
  const queryString = `select p.product_id, p.name, f.feature, f.value from products p inner join features f
  on f.product_id = p.product_id
  where p.product_id=1;`;
  client
    .query(queryString)
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
