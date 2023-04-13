import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://3.145.151.125:8000/api',
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxNDM2NjQ5LCJpYXQiOjE2ODE0MDc4NDksImp0aSI6Ijk5NWRiYTU1ZWVhMjQwZTM4ZDE2YzdkYWJkYWFhZjBlIiwidXNlcl9pZCI6OX0.nlNT3vIEOdQtvxMZlxs9hHB7LjqhYRo9PwEeQpW1xlA'}`,
    }
})

export default instance