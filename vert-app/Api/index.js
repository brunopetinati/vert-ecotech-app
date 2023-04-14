import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

async function getToken() {
  const tokenString = await AsyncStorage.getItem('userCredentials')
  console.log("tokenString")
  console.log(tokenString)
  return JSON.parse(tokenString)?.access
}

const instance = axios.create({
    baseURL: 'http://3.145.151.125:8000/api',
    timeout: 10000,
    headers: {
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${getToken()}`,
    }
})

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`

    config.headers.AccessControlAllowOrigin = 'Access-Control-Allow-Origin *'

    // production
    config.baseURL = `http://3.145.151.125:8000/api`
    
    return config
  },
  async (error) => {
    console.log(error)
  }
)

export default axios