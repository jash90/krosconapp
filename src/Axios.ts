import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 1000,
    headers: {'X-Custom-Header': 'application/json'}
  });
  