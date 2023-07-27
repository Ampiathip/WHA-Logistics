import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Dashboard from "../pages/Dashboard";
import HistoricalData from "../pages/HistoricalData";
import Login from "../pages/Login";
import Diveices from "../pages/Diveices";

const Routers = () => {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/historicalData" element={<HistoricalData />} />
      <Route path="/divices" element={<Diveices />} />
      <Route element={PageNotFound} />
    </Routes>
  );
};

export default Routers;
