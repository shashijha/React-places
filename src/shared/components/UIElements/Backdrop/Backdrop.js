import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = ({hideDrawerHandler}) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={hideDrawerHandler}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
