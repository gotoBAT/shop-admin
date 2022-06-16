import Axios from './axios'
const http = new Axios({
  baseURL: import.meta.env.VITE_API_BASEURL
})
export default http
