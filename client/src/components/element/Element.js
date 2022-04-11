import React from 'react';
import "../../styles/css/App.css";
import {FaFont} from 'react-icons/fa'
import {BsImage} from 'react-icons/bs'
import {MdSmartButton} from 'react-icons/md'

const Element = (props) => {
  switch (props.name) {
    case 'Text': 
      return (
        <div className="element" >
          <FaFont size={30} color="#a9413a"/>
          <span className="element--label">{props.name}</span>
        </div>
      );
    case 'Image':
      return (
        <div className="element" >
          <BsImage size={30} color="#f0951c"/>
          <span className="element--label">{props.name}</span>
        </div>
      );
    case 'Button':
      return (
        <div className="element" >
          <MdSmartButton size={40} color="#4b9846"/>
          <span className="element--label">{props.name}</span>
        </div>
      );
  }
};

export default Element;
