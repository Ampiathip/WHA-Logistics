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

  const buildingUser = (body) => {
    return tokenAPI.post(`/api/building-user/add`, body);
  };

  const delectBuildingUser = (id) => {
    return tokenAPI.delete(`/api/building-user/remove/${id}`);
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

  /* ============== UnitType API ================ */

  const UnitTypeRegister = (body) => {
    return tokenAPI.post(`/api/unit-type/add`, body);
  };

  const getUnitTypeList = () => {
    return tokenAPI.get(`/api/unit-type/list`);
  };

  const getUnitTypeView = (id = 0) => {
    return tokenAPI.get(`/api/unit-type/read/${id}`);
  };

  const unitTypeUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/unit-type/update/${id}`, body);
  };

  const unitTypeDelete = (id = 0) => {
    return tokenAPI.delete(`/api/unit-type/remove/${id}`);
  };

    /* ============== Unit Points API ================ */

    const getUnitPointData = (id = 0) => {
      return tokenAPI.get(`/api/unit-point/list/${id}`);
    };
  
    const unitPointRegister = (body) => {
      return tokenAPI.post(`/api/unit-point/add`, body);
    };
  
    const unitPointUpdate = (id, body) => {
      return tokenAPI.put(`/api/unit-point/update/${id}`, body);
    };
  
    const unitPointDelete = (id = 0) => {
      return tokenAPI.delete(`/api/unit-point/remove/${id}`);
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

  /* ============== Device API ================ */

  const getDeviceData = (id = 0) => {
    return tokenAPI.get(`/api/device/list/${id}`);
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

  /* ============== Billing-type API ================ */

  const getBillingTypeData = () => {
    return tokenAPI.get(`/api/billing-type/list`);
  };

  const billingTypeRegister = (body) => {
    return tokenAPI.post(`/api/billing-type/add`, body);
  };

  const getBillingTypeView = (id = 0) => {
    return tokenAPI.get(`/api/billing-type/read/${id}`);
  };

  const billingTypeUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/billing-type/update/${id}`, body);
  };

  const billingTypeDelete = (id = 0) => {
    return tokenAPI.delete(`/api/billing-type/remove/${id}`);
  };

  /* ============== Points API ================ */

  const getPointData = (id = 0) => {
    return tokenAPI.get(`/api/point/list/${id}`);
  };

  const pointRegister = (body) => {
    return tokenAPI.post(`/api/point/add`, body);
  };

  // const getPointView = (id = 0) => {
  //   return tokenAPI.get(`/api/point/read/${id}`);
  // };

  const pointUpdate = (body) => {
    return tokenAPI.put(`/api/point/update`, body);
  };

  const pointDelete = (id = 0) => {
    return tokenAPI.delete(`/api/point/remove/${id}`);
  };

  /* ============== Zone API ================ */

  const getZoneData = () => {
    return tokenAPI.get(`/api/zone/list`);
  };

  const zoneRegister = (body) => {
    return tokenAPI.post(`/api/zone/add`, body);
  };

  const getZoneView = (id = 0) => {
    return tokenAPI.get(`/api/zone/read/${id}`);
  };

  const zoneUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/zone/update/${id}`, body);
  };

  const zoneDelete = (id = 0) => {
    return tokenAPI.delete(`/api/zone/remove/${id}`);
  };

  /* ============== Zone Type API ================ */

  const getZoneTypeData = () => {
    return tokenAPI.get(`/api/zone-type/list`);
  };

  const zoneTypeRegister = (body) => {
    return tokenAPI.post(`/api/zone-type/add`, body);
  };

  const getZoneTypeView = (id = 0) => {
    return tokenAPI.get(`/api/zone-type/read/${id}`);
  };

  const zoneTypeUpdate = (id = 0, body) => {
    return tokenAPI.put(`/api/zone-type/update/${id}`, body);
  };

  const zoneTypeDelete = (id = 0) => {
    return tokenAPI.delete(`/api/zone-type/remove/${id}`);
  };

  /* ============== Zone Unit API ================ */

  const getZoneUnitData = (id = 0) => {
    return tokenAPI.get(`/api/zone-unit/list/${id}`);
  };

  const zoneUnitRegister = (body) => {
    return tokenAPI.post(`/api/zone-unit/add`, body);
  };

  // const getZoneUnitView = (id = 0) => {
  //   return tokenAPI.get(`/api/zone-unit/read/${id}`);
  // };

  const zoneUnitUpdate = (body) => {
    return tokenAPI.put(`/api/zone-unit/update`, body);
  };

  // const zoneUnitDelete = (body) => {
  //   return tokenAPI.delete(`/api/zone-unit/remove`, body);
  // };

  const zoneUnitDelete = (body) => {
    return tokenAPI.post(`/api/zone-unit/remove`, body);
  };

  const zoneUnitBuilding = (id = 0) => {
    return tokenAPI.get(`/api/unit-building/list/${id}`);
  };

  /* ============== Role-type API ================ */

  const roleTypeList = () => {
    return tokenAPI.get(`/api/role-type/list`);
  };

  /* ============== Realtimedata API ================ */

  const realtimeData = (id = 0) => {
    return tokenAPI.get(`/api/realtimedata/${id}`);
  };

  const myDevice = () => {
    return tokenAPI.get(`/api/my-device`);
  };

  /* ============== Historicaldata API ================ */

  const historicaldata = (dateTimeFormat = '', startTime = '', endTime = '', body) => {
    return tokenAPI.post(`/api/historicaldata?dateTimeFormat=${dateTimeFormat}&startTime=${startTime}&endTime=${endTime}`, body);
  };


  return {
    connectTokenAPI,

    forgotPassword,
    userLogin,
    userRegister,
    getUserData,
    getUserView,
    userDelete,
    userUpdate,

    buildingUser,
    delectBuildingUser,

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

    UnitTypeRegister,
    getUnitTypeList,
    getUnitTypeView,
    unitTypeUpdate,
    unitTypeDelete,

    getUnitPointData,
    unitPointRegister,
    unitPointUpdate,
    unitPointDelete,

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

    getBillingTypeData,
    billingTypeRegister,
    getBillingTypeView,
    billingTypeUpdate,
    billingTypeDelete,

    getPointData,
    pointRegister,
    pointUpdate,
    pointDelete,

    getZoneData,
    zoneRegister,
    getZoneView,
    zoneUpdate,
    zoneDelete,

    getZoneTypeData,
    zoneTypeRegister,
    getZoneTypeView,
    zoneTypeUpdate,
    zoneTypeDelete,

    getZoneUnitData,
    zoneUnitRegister,
    zoneUnitUpdate,
    zoneUnitDelete,

    zoneUnitBuilding,
    
    roleTypeList,

    realtimeData,
    myDevice,

    historicaldata,
  };
};
export default {
  getAPI,
};
