import axios from 'axios';
import helper from './helper';

const getAPI = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
    "Content-Type": "application/json"
    },
    timeout: 85000
  });

  let tokenAPI;

  const connectTokenAPI = (token) => {
    tokenAPI = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
      "Content-Type": "application/json",
      "token": helper.decryptData(token)
      },
      timeout: 85000
    });
  }

  /* =============== Contents API ============== */

   /* ============== Download API ================ */

  /* ============== User API ================ */

  const forgotPassword = (email) => {
    return api.get(`/api/v1/user/forgetpwd/${email}`)
  }

  const userLogin = (username, password) => {
    return api.post(`/api/v1/user/login?username=${username}&password=${password}`)
  }

  /* ============= Master Data ============== */

  

  /* ========================================= */

  
  return {
    connectTokenAPI,

    forgotPassword,
    userLogin,
  }
}
export default  {
  getAPI
}
