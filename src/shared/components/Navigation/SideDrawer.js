import React from "react";
import ReactDOM from "react-dom";

import "./SideDrawer.css";

// React portal concept provides us the ability to break out of this dom tree
//  and render a component onto a dom node that is not under this root element.
//   Doing so breaks the convention where a component needs to be rendered as a
//   new element and follows a parent-child hierarchy

const SideDrawer = (props) => {
  const content = <aside className="side-drawer">{props.children}</aside>;
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
