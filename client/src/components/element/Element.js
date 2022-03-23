import React from 'react';
import "../../styles/css/App.css";

const Element = (props) => {
  
  return <div className="element" >
    <div className="element--icon"><div className={props.class}></div></div>
    <span className="element--label">{props.name}</span>
  </div>;
};

export default Element;
