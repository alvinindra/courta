import axios from 'axios'
import Cookies from 'js-cookie'
export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const apiClient = axios.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  }
})

apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get('token')

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },

  error => Promise.reject(error)
)
