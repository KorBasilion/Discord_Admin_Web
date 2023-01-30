import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

import logoImg from "../../images/logo.png";
import homeIcon from "../../images/homeIcon.png";
import pinIcon from "../../images/pinIcon.png";

export default function Sidebar() {
  let [clickedBar, setClikedBar] = useState(0);
  const itemClicked = () => {
    if (clickedBar == 0) {
      return <div className="sidebarListItemClicked"></div>;
    } else {
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebarTitle">
        <img src={logoImg} width="60px" height="60px" />
        <h1 className="sidebarTitleText">DAW</h1>
      </div>
      <h3 className="sidebarGeneral">General</h3>
      <nav className="sidebarList">
        <Link
          to="/home"
          className="sidebarLink"
          onClick={() => setClikedBar(0)}
          style={{ textDecoration: "none" }}
        >
          <div className="sidebarListItem">
            <img src={homeIcon} width="25px" height="25px" />
            <text className="sidebarListItemText">Home</text>
            <div className="sidebarListItemClicked" />
          </div>
        </Link>
        <Link
          to="/pinned"
          className="sidebarLink"
          onClick={() => setClikedBar(1)}
          style={{ textDecoration: "none" }}
        >
          <div className="sidebarListItem">
            <img src={pinIcon} width="25px" height="25px" />
            <text className="sidebarListItemText">Pinned Message</text>
            <div className="sidebarListItemClicked" />
          </div>
        </Link>
      </nav>
    </div>
  );
}
