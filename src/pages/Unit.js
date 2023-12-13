import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableUnitView from "../component/unitManagementView";


const Unit = () => {
  const { t, i18n } = useTranslation(["floor"]);

  return (
    <>
      <Layout type={"Unit"}>
        <TableUnitView t={t}/>
      </Layout>
    </>
  );
};

Unit.propTypes = {};

export default Unit;
