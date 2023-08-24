import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableGatewayDeviceDetail from "../component/gatewayDeviceDetail"


const GatewayDeviceDetail = () => {
  const { t, i18n } = useTranslation(["gateway"]);

  return (
    <>
      <Layout type={"Gateway"}>
        <TableGatewayDeviceDetail t={t} pageName={"Device"}/>
      </Layout>
    </>
  );
};

GatewayDeviceDetail.propTypes = {};

export default GatewayDeviceDetail;
