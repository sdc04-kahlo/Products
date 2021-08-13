import express from 'express';

const app = express();
const port = 3000;

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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
