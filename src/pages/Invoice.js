import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import TableInvoice from "../component/invoiceManagement";


const Invoice = () => {
  const { t, i18n } = useTranslation(["invoice"]);

  return (
    <>
      <Layout type={"Invoice"}>
        <TableInvoice t={t}/>
      </Layout>
    </>
  );
};

Invoice.propTypes = {};

export default Invoice;
