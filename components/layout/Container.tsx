import React from "react";
import { CommonPropTypes } from "../../common";

const Container = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    );
};

Container.propTypes = {
    children: CommonPropTypes.Children
};

export default Container;
