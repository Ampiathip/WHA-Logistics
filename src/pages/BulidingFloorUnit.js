import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableBuildingFloorUnit from "../component/buildingFloorUnitDetail";


const BuildingFloorUnit = () => {
  const { t, i18n } = useTranslation(["floor", "gateway"]);

  return (
    <>
      <Layout type={"Building"}>
        <TableBuildingFloorUnit t={t} pageName={"Floor"} subPageName={"Unit"}/>
      </Layout>
    </>
  );
};

BuildingFloorUnit.propTypes = {};

export default BuildingFloorUnit;
