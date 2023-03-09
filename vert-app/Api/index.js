import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.15.8:8000/api',
    timeout: 10,
    headers: {'Access-Control-Allow-Origin': '*'}
  })

export default instance