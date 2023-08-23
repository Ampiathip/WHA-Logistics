import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import HistoricalData from "../pages/HistoricalData";
import Login from "../pages/Login";
import Diveices from "../pages/Diveices";
import Parameter from "../pages/Parameter";
import User from "../pages/User";
import FloorDiagram from "../pages/FloorDiagram";
import Building from "../pages/Building";
import Gateway from "../pages/Gateway";

const Routers = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/floorDiagram" element={<FloorDiagram />} />
      <Route path="/historicalData" element={<HistoricalData />} />
      <Route path="/divices" element={<Diveices />} />
      <Route path="/parameter" element={<Parameter />} />
      <Route path="/user" element={<User />} />
      <Route path="/building" element={<Building />} />
      <Route path="/gateway" element={<Gateway />} />
      <Route element={PageNotFound} />
    </Routes>
  );
};

export default Routers;
