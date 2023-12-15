import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableBuilding from "../component/buildingManagement";


const Building = () => {
  const { t, i18n } = useTranslation(["building"]);

  return (
    <>
      <Layout type={"Building"}>
        <TableBuilding t={t}/>
      </Layout>
    </>
  );
};

Building.propTypes = {};

export default Building;
