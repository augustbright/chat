import React from "react";
import Container from "./Container";
import { CommonPropTypes } from "../../common";
import Header from "./Header";
import "./WithBootstrap.scss";

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
