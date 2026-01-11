import axios from 'axios'
import { deleteItem, getDecryptedItem } from './localStorage'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'localhost:8000',
})

const user = getDecryptedItem('user')
if (import.meta.env.MODE !== 'production') {
  console.log(user, 'user from local storage')
}
// Set Authorization header dynamically before each request
instance.interceptors.request.use(
  (config) => {
    const user = getDecryptedItem('user')
    if (user && user.token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${user.token}`
    } else if (config.headers && config.headers['Authorization']) {
      delete config.headers['Authorization']
    }
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.status)
    if (error.status === 401) {
      // Handle unauthorized access, e.g., redirect to login

      console.error('Unauthorized access - redirecting to login')
      deleteItem('user')
      window.location.replace('/auth/login')
    }
    return Promise.reject(error)
  }
)
export default instance
