import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import UserManagement from "../component/userManagement";

const User = () => {
  const { t, i18n } = useTranslation(["user"]);

  return (
    <>
      <Layout type={"User"}>
        <UserManagement t={t} />
      </Layout>
    </>
  );
};

User.propTypes = {};

export default User;
