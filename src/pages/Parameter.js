import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import ParameterData from "../component/parameterData";

const Parameter = () => {
  const { t, i18n } = useTranslation(["parameter"]);

  return (
    <>
      <Layout type={"Parameter"}>
        <ParameterData t={t} />
      </Layout>
    </>
  );
};

Parameter.propTypes = {};

export default Parameter;
