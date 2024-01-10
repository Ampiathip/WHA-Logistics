import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import CalendarUnit from '../component/calendarUnit';
// import Charts from "../component/charts";
// import SideBarSelect from "../component/sideBarSelect";
// import PropTypes from "prop-types";

// import FileImage from '../../public/img/test2.png'
// import logo from '../logo.svg';

const HistoricalDataUnit = () => {
  const { t, i18n } = useTranslation(["historicalData"]);

  return (
    <>
      <Layout type={"HistoricalDataUnit"}>
        <CalendarUnit t={t} />
      </Layout>
    </>
  );
};

HistoricalDataUnit.propTypes = {};

export default HistoricalDataUnit;
