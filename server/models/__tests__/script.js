import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '1m', target: 1200 },
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/reviews?product_id=43311');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
};
