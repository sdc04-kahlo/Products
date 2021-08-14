import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 300,
  duration: '15s',
};

export default function () {
  const product_id = Math.round(Math.random() * 1000);
  http.get(`http://localhost:3000/products/${product_id}/styles`);
  // http.get(`http://localhost:3000/products/`);
  sleep(1);
}
