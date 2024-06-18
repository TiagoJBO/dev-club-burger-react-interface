import axios from 'axios'

const apiDevBurger = axios.create({
  baseURL: 'https://dev-club-burger-production-d0a3.up.railway.app/'
})
apiDevBurger.interceptors.request.use(async (config) => {
  const userData = await localStorage.getItem('devburger:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `bearer ${token}`
  return config
})
export default apiDevBurger
