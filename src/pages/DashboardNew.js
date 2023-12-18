import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import Dashboard from '../component/dashboard';


const DashboardNew = () => {
  const { t, i18n } = useTranslation(["home"]);

  return (
    <>
      <Layout type={"Dashboard"}>
        <Dashboard t={t}/>
      </Layout>
    </>
  );
};

DashboardNew.propTypes = {};

export default DashboardNew;
