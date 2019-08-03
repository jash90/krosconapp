import axios from "axios";

export default axios.create({
    baseURL: 'http://kroscon-api.raccoonsoftware.pl',
    timeout: 20000,
    headers: {'X-Custom-Header': 'application/json'}
  });
  