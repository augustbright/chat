import React from "react";
import Container from "./Container";
import { CommonPropTypes } from "../../common";
import "./WithBootstrap.scss";

const BasicPage = ({ children, store }) => (
    <Container>{children}</Container>
);

BasicPage.propTypes = {
  children: CommonPropTypes.Children
};

export default BasicPage;
