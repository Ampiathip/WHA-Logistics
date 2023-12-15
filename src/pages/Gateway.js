import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableGateway from "../component/gatewayManagement"


const Gateway = () => {
  const { t, i18n } = useTranslation(["gateway"]);

  return (
    <>
      <Layout type={"Gateway"}>
        <TableGateway t={t} />
      </Layout>
    </>
  );
};

Gateway.propTypes = {};

export default Gateway;
