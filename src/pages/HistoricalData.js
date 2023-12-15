import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import SideBarPage from "../component/sideBarPage";
import Calendar from "../component/calendar";
// import Charts from "../component/charts";
// import SideBarSelect from "../component/sideBarSelect";
// import PropTypes from "prop-types";

// import FileImage from '../../public/img/test2.png'
// import logo from '../logo.svg';

const HistoricalData = () => {
  const { t, i18n } = useTranslation(["historicalData"]);

  return (
    <>
      <Layout type={"HistoricalData"}>
        <SideBarPage t={t} >
          {/* <Calendar t={t} /> */}
        </SideBarPage>
        {/* <SideBarSelect>
          <Charts />
        </SideBarSelect> */}
      </Layout>
    </>
  );
};

HistoricalData.propTypes = {};

export default HistoricalData;
