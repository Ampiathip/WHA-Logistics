import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Layout from "../component/layout";
import TableZoneDetail from "../component/zoneDetail";

const ZoneDetail = () => {
  const zone = useSelector((state) => state.zone);
  const { t, i18n } = useTranslation(["floor", "gateway", "zone"]);
  return (
    <>
      <Layout type={"Zone"}>
        <TableZoneDetail
          t={t}
          pageName={zone?.zone}
          subPageName={""}
          zoneData={zone}
        />
      </Layout>
    </>
  );
};

ZoneDetail.propTypes = {};

export default ZoneDetail;
