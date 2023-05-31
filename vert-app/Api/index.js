import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

async function getToken() {
  const tokenString = await AsyncStorage.getItem('userCredentials')
  return JSON.parse(tokenString)?.access
}

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await getToken()}`
    
    config.headers.AccessControlAllowOrigin = 'Access-Control-Allow-Origin *'

    // production
    config.baseURL = `http://18.218.97.13:8000/api`
    
    return config
  },
  async (error) => {
    console.log(error)
  }
)

export default axios