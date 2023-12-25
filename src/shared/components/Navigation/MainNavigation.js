import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideDrawer from "./SideDrawer";
import Backdrop from "../../../shared/components/UIElements/Backdrop/Backdrop";

const MainNavigation = () => {
    const [showDrawer , setShowDrawer] = useState(false);
    const showDrawerHandler = () => {
        setShowDrawer(true);
    }
    const hideDrawerHandler = () => {
        setShowDrawer(false);
    }
  return (
    <React.Fragment>
        {showDrawer && <Backdrop hideDrawerHandler={hideDrawerHandler}/>}
      {showDrawer && <SideDrawer>
        <nav className="main-navigation__drawer-nav">
            <NavLinks />
        </nav>
      </SideDrawer>}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={showDrawerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/">
          <h1 className="main-navigation__title">YOUR PLACES</h1>
        </Link>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
