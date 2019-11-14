import React from "react";
import Container from "./Container";
import CommonPropTypes from "../../lib/prop_types";
import Header from "./Header";
import "./WithBootstrap.scss";
import "./BasicPage.scss";

const BasicPage = ({ children }) => (
  <div className="d-flex h-100 basic-page">
    <Header />
    <Container>{children}</Container>
  </div>
);

BasicPage.propTypes = {
  children: CommonPropTypes.Children
};

export default BasicPage;
