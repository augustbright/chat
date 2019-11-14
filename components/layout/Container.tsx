import React from "react";
import CommonPropTypes from "../../lib/prop_types";

const Container = ({children}) => {
    return (
        <div className="container-fluid basic-page-container">
            {children}
        </div>
    );
};

Container.propTypes = {
    children: CommonPropTypes.Children
};

export default Container;
