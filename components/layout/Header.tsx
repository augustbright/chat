import React from "react";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionPanel from '../SessionPanel';

export default () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <FontAwesomeIcon className="mr-1" icon={faPenFancy} size="1x" />
        Chattik
      </a>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
      </div>      

      <SessionPanel/>
    </nav>
  );
};
