import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/DashboardNew";
import HistoricalData from "../pages/HistoricalData";
import Login from "../pages/Login";
import Diveices from "../pages/Diveices";
import Parameter from "../pages/Parameter";
import User from "../pages/User";
import FloorDiagram from "../pages/FloorDiagram";
import Building from "../pages/Building";
import Gateway from "../pages/Gateway";
import GatewayDeviceDetail from "../pages/GatewayDeviceDetail";
import BuildingFloor from "../pages/BulidingFloor";
import BuildingFloorUnit from "../pages/BulidingFloorUnit";
import Zone from "../pages/Zone";
import ZoneDetail from "../pages/zoneDetail";
import SystemOverview from "../pages/SystemOverview";
import Invoice from "../pages/Invoice";
import Unit from "../pages/Unit";

const Routers = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/floorDiagram" element={<FloorDiagram />} />
        <Route path="/historicalData" element={<HistoricalData />} />
        <Route path="/systemOverview" element={<SystemOverview />} />
        <Route path="/divices" element={<Diveices />} />
        <Route path="/parameter" element={<Parameter />} />
        <Route path="/user" element={<User />} />
        <Route path="/building" element={<Building />} />
        <Route path="/buildingFloorDetail" element={<BuildingFloor />} />
        <Route
          path="/buildingFloorUnitDetail"
          element={<BuildingFloorUnit />}
        />
        <Route path="/gateway" element={<Gateway />} />
        <Route path="/gatewayDeviceDetail" element={<GatewayDeviceDetail />} />
        <Route path="/zone" element={<Zone />} />
        <Route path="/zoneDetail" element={<ZoneDetail />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/unitView" element={<Unit />} />
        <Route element={PageNotFound} />
      </Routes>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Routers);
