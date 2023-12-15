import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableZone from "../component/zoneManagement";


const Zone = () => {
  const { t, i18n } = useTranslation(["zone", "building"]);

  return (
    <>
      <Layout type={"Zone"}>
        <TableZone t={t}/>
      </Layout>
    </>
  );
};

Zone.propTypes = {};

export default Zone;
