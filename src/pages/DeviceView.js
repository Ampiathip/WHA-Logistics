import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableDeviceView from "../component/deviceManagementView";


const Device = () => {
  const { t, i18n } = useTranslation(["floor"]);

  return (
    <>
      <Layout type={"Device"}>
        <TableDeviceView t={t}/>
      </Layout>
    </>
  );
};

Device.propTypes = {};

export default Device;
