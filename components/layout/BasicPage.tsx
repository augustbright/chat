import React from "react";
import Container from "./Container";
import CommonPropTypes from "../../lib/prop_types";
import Header from "./Header";
import "./WithBootstrap.scss";
import "./BasicPage.scss";

const BasicPage = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
  </>
);

BasicPage.propTypes = {
  children: CommonPropTypes.Children
};

export default BasicPage;
