import React from "react";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionPanel from "../SessionPanel";
import Link from "next/link";
import { useRouter } from "next/router";
import {useSelector} from 'react-redux';
import {selectSessionAuthenticated} from '../../redux/selectors';

const NavLink = ({ children, href }) => {
  const router = useRouter();
  const itemClassNames = ["nav-item"];
  const active = href === router.route;
  if (active) {
    itemClassNames.push("active");
  }

  return (
    <li className={itemClassNames.join(" ")}>
      <Link href={href}>
        <a className="nav-link">{children}</a>
      </Link>
    </li>
  );
};

export default () => {
  const authenticated = useSelector(selectSessionAuthenticated);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon className="mr-1" icon={faPenFancy} size="1x" />
          Chattik
        </a>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {authenticated ? <NavLink href="/search">Explore</NavLink> : null}
          {authenticated ? <NavLink href="/new">Create</NavLink> : null}
        </ul>
      </div>
      <SessionPanel />
    </nav>
  );
};
