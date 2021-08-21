import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '20s',
};

export default function () {
  // const product_id = Math.round(Math.random() * 100000 + 900000);
  // http.get(`http://localhost:3000/products/${product_id}/styles`);

  // get a high page number
  const page = Math.round(Math.random() * 10000 + 90000);
  const body = JSON.stringify({ page });
  const params = { headers: { 'Content-Type': 'application/json' } };
  http.request('GET', 'http://localhost:3000/products/', body, params);

  // http.get(`http://localhost:3000/products/${product_id}`);
  sleep(1);
}
