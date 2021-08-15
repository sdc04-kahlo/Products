require('dotenv').config();
require('newrelic');
const express = require('express');
const morgan = require('morgan');
const { Client } = require('pg');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// connect to database
const client = new Client();
client
  .connect()
  .then(() => console.log('connected to database'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/products', async (req, res) => {
  const limit = req.body.count || 10;

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

app.get('/products/:product_id/styles', async (req, res) => {
  const query = {
    name: 'get-styles',
    text: `
      select s.product_id,
        (select json_agg(sty)
        from (
          select style_id, name, original_price, sale_price, default_style,
            (select json_agg(pho) from (
              select thumbnail_url, url from photos where style_id=1
            ) pho
          ) as photos
          from styles where product_id=$1
        ) sty
      ) as results
      from styles s where s.product_id=$1
    `,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows[0]);
  } catch (err) {
    res.json(err);
  }
});

app.get('/products/:product_id/related', async (req, res) => {
  const query = {
    name: 'get-related',
    text: `
      select array_agg(related_product_id)
        from related where current_product_id=$1
    `,
    values: [req.params.product_id],
  };

  try {
    const results = await client.query(query);
    res.json(results.rows[0].array_agg);
  } catch (err) {
    res.json(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
