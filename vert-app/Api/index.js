import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10,
    headers: {'Access-Control-Allow-Origin': '*'}
  });

export default instance