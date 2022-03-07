import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../../App.css";
import Element from './Element';

const ElementTable = (props) => {
  return(<div className="element-table">
    <Element id={1} name="Text" icon="../assets/text.png"/>
    <Element id={2} name="Image" icon="../assets/image.png"/>
    <Element id={3} name="Button" icon="../assets/button.png"/>
  </div>
  ); 
};

export default ElementTable;
