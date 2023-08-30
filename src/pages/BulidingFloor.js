import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableBuildingFloor from "../component/buildingFloorDetail";


const BuildingFloor = () => {
  const { t, i18n } = useTranslation(["floor"]);

  return (
    <>
      <Layout type={"Building"}>
        <TableBuildingFloor t={t} pageName={"Floor"}/>
      </Layout>
    </>
  );
};

BuildingFloor.propTypes = {};

export default BuildingFloor;
