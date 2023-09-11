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
    // Declare tokenAPI using let

    // Create the Axios instance
    tokenAPI = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authtoken": token
        // "authtoken" : helper.decryptData(token)
      },
      timeout: 85000
    });
  
    // Return the Axios instance so it can be used elsewhere
    return tokenAPI;
  };

  /* =============== Contents API ============== */

   /* ============== Download API ================ */

  /* ============== User API ================ */

  const forgotPassword = (email) => {
    return api.get(`/api/v1/user/forgetpwd/${email}`)
  }

  const userLogin = (body) => {
    return api.post(`/api/login`, body)
  }

  const userRegister = (body) => {
    console.log('bodyReg', body);
    return api.post(`/api/register`, body)
  }

  const getUserData = () => {
    return tokenAPI.get(`/api/users`)
  }


  /* ============= Master Data ============== */

  

  /* ========================================= */

  
  return {
    connectTokenAPI,

    forgotPassword,
    userLogin,
    userRegister,
    getUserData,
  }
}
export default  {
  getAPI
}
