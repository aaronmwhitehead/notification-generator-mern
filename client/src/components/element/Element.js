import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../../App.css";

const Element = (props) => {
  
  return <div className="element" >
    <div className="element--icon"><div className={props.class}></div></div>
    <span className="element--label">{props.name}</span>
  </div>;
};

export default Element;
