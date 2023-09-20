import axios from "axios";
import helper from "./helper";

const getAPI = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 85000,
  });

  let tokenAPI;

  const connectTokenAPI = (token) => {
    // Declare tokenAPI using let

    // Create the Axios instance
    tokenAPI = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authtoken: token,
        // "authtoken" : helper.decryptData(token)
      },
      timeout: 85000,
    });

    // Return the Axios instance so it can be used elsewhere
    return tokenAPI;
  };

  /* =============== Contents API ============== */

  /* ============== Download API ================ */

  /* ============== User API ================ */

  const forgotPassword = (id = 0, body) => {
    return tokenAPI.put(`/api/users/update-pass/${id}`, body);
  };

  const userLogin = (body) => {
    return api.post(`/api/auth/login`, body);
  };

  const userRegister = (body) => {
    return tokenAPI.post(`/api/auth/register`, body);
  };

  const getUserData = () => {
    return tokenAPI.get(`/api/users/list`);
  };

  const getUserView = (id = 0) => {
    return tokenAPI.get(`/api/users/read/${id}`);
  };

  const userDelete = (id = 0) => {
    return tokenAPI.delete(`/api/users/remove/${id}`);
  };

  const userUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/users/update-user/${id}`, body);
  };

  /* ============== Building API ================ */
  const getBuildingData = () => {
    return tokenAPI.get(`/api/building/list`);
  };

  const BuildingRegister = (body) => {
    return tokenAPI.post(`/api/building/add`, body);
  };

  const getBuildingView = (id = 0) => {
    return tokenAPI.get(`/api/building/read/${id}`);
  };

  const getBuildingViewUser = (id = 0) => {
    return tokenAPI.get(`/api/building/list-user/${id}`);
  };

  const buildingUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/building/update/${id}`, body);
  };

  const buildingDelete = (id = 0) => {
    return tokenAPI.delete(`/api/building/remove/${id}`);
  };

  /* ============== Floor API ================ */

  const FloorRegister = (body) => {
    return tokenAPI.post(`/api/floor/add`, body);
  };

  const getFloorList = (id = 0) => {
    return tokenAPI.get(`/api/floor/list/${id}`);
  };

  const floorUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/floor/update/${id}`, body);
  };

  const floorDelete = (id = 0) => {
    return tokenAPI.delete(`/api/floor/remove/${id}`);
  };

  /* ============== Unit API ================ */

  const UnitRegister = (body) => {
    return tokenAPI.post(`/api/unit/add`, body);
  };

  const getUnitList = (id = 0) => {
    return tokenAPI.get(`/api/unit/list/${id}`);
  };

  const getUnitView = (id = 0) => {
    return tokenAPI.get(`/api/unit/read/${id}`);
  };

  const unitUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/unit/update/${id}`, body);
  };

  const unitDelete = (id = 0) => {
    return tokenAPI.delete(`/api/unit/remove/${id}`);
  };

  /* ============== Gateway API ================ */

  const getGatewayData = () => {
    return tokenAPI.get(`/api/gateway/list`);
  };

  const gatewayRegister = (body) => {
    return tokenAPI.post(`/api/gateway/add`, body);
  };

  const getGatewayView = (id = 0) => {
    return tokenAPI.get(`/api/gateway/read/${id}`);
  };

  const gatewayUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/gateway/update/${id}`, body);
  };

  const gatewayDelete = (id = 0) => {
    return tokenAPI.delete(`/api/gateway/remove/${id}`);
  };

  /* ============== Communication API ================ */

  const getCommunicationData = () => {
    return tokenAPI.get(`/api/communication/list`);
  };

  const communicationRegister = (body) => {
    return tokenAPI.post(`/api/communication/add`, body);
  };

  const communicationUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/communication/update/${id}`, body);
  };

  const communicationDelete = (id = 0) => {
    return tokenAPI.delete(`/api/communication/remove/${id}`);
  };

  /* ============== Gateway API ================ */

  const getDeviceData = (body) => {
    return tokenAPI.post(`/api/device/list`, body);
  };

  const deviceRegister = (body) => {
    return tokenAPI.post(`/api/device/add`, body);
  };

  const getDeviceView = (id = 0) => {
    return tokenAPI.get(`/api/device/read/${id}`);
  };

  const deviceUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/device/update/${id}`, body);
  };

  const deviceDelete = (id = 0) => {
    return tokenAPI.delete(`/api/device/remove/${id}`);
  };

  /* ============= Master Data ============== */

  /* ========================================= */

  return {
    connectTokenAPI,

    forgotPassword,
    userLogin,
    userRegister,
    getUserData,
    getUserView,
    userDelete,
    userUpdate,

    getBuildingData,
    BuildingRegister,
    getBuildingView,
    getBuildingViewUser,
    buildingUpdate,
    buildingDelete,

    FloorRegister,
    getFloorList,
    floorUpdate,
    floorDelete,

    UnitRegister,
    getUnitList,
    getUnitView,
    unitUpdate,
    unitDelete,

    getGatewayData,
    gatewayRegister,
    getGatewayView,
    gatewayUpdate,
    gatewayDelete,

    getCommunicationData,
    communicationRegister,
    communicationUpdate,
    communicationDelete,

    getDeviceData,
    deviceRegister,
    getDeviceView,
    deviceUpdate,
    deviceDelete,
  };
};
export default {
  getAPI,
};
