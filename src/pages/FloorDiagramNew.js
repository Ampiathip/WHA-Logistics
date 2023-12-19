import React from 'react';
import { useTranslation } from "react-i18next";
import Layout from "../component/layout";
import FloorDiagram from '../component/floorDiagram';


const FloorDiagramNew = () => {
  const { t, i18n } = useTranslation(["floorDiagram", "building", "floor"]);

  return (
    <>
      <Layout type={"FloorDiagram"}>
        <FloorDiagram t={t}/>
      </Layout>
    </>
  );
};

FloorDiagramNew.propTypes = {};

export default FloorDiagramNew;
