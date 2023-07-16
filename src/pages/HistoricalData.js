import Layout from "../component/layout";
import SideBarPage from "../component/sideBarPage";
import Calendar from "../component/calendar";
import Charts from "../component/charts";
import SideBarSelect from "../component/sideBarSelect";
import PropTypes from "prop-types";

// import FileImage from '../../public/img/test2.png'
// import logo from '../logo.svg';

const HistoricalData = () => {
  return (
    <>
      <Layout type={"HistoricalData"}>
        <SideBarPage>
          <Calendar />
        </SideBarPage>
        <SideBarSelect>
          <Charts />
        </SideBarSelect>
      </Layout>
    </>
  );
};

HistoricalData.propTypes = {};

export default HistoricalData;
