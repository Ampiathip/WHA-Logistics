import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableDivices from "../component/tableDivices";

const Divices = () => {
  const { t, i18n } = useTranslation(["diveices"]);

  return (
    <>
      <Layout type={"Divices"}>
        <TableDivices t={t} />
      </Layout>
    </>
  );
};

Divices.propTypes = {};

export default Divices;
