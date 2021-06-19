// @ts-nocheck
import React from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import {Navbar} from "../../components/navbar";
import {Footer} from "../../components/footer";

const { Content } = Layout;
function LayoutContainer({ children }) {
  return (
    <Layout className="layout">
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
}
export default withRouter(LayoutContainer);
