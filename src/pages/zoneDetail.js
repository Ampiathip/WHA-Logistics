import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Layout from "../component/layout";
import TableBuildingFloorUnit from "../component/buildingFloorUnitDetail";

const ZoneDetail = () => {
  const zone = useSelector((state) => state.zone);
  const { t, i18n } = useTranslation(["floor", "gateway", "zone"]);
  return (
    <>
      <Layout type={"Zone"}>
        {/* component Unit */}
        <TableBuildingFloorUnit
          t={t}
          pageName={zone?.calories}
          subPageName={""}
          zoneData={zone}
        />
      </Layout>
    </>
  );
};

ZoneDetail.propTypes = {};

export default ZoneDetail;
