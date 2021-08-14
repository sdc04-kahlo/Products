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

app.get('/products', async (req, res) => {
  const limit = 10;

  const query = {
    name: 'get-products-all',
    text: 'SELECT * FROM products LIMIT $1',
    values: [limit],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
});

app.get('/products/:product_id', async (req, res) => {
  const query = {
    name: 'get-product-single',
    text: `
      select p.product_id, p.name, p.slogan, p.description, p.category, p.default_price,
        (select json_agg(feat)
        from (
          select feature, value from features where product_id=$1
        ) feat
      ) as features
      from products p where p.product_id=$1
    `,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows);
  } catch (err) {
    res.json(err);
  }
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
