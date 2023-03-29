import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://192.168.15.13:8000/api',
    timeout: 10,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
    }
})

export default instance