import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ElementTable from "./element/ElementTable";
import axios from "axios";
import { useDrop } from "react-dnd";
import Field from "./fields/Field"
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';


const FieldList = [
  {
    id: 1,
    name: "text",
    contents: "<div style='border:1px solid'>Welcome to my text</div>"
  },
  {
    id: 2,
    name: "image",
    contents: "<div style='border:1px solid; color:green'>Welcome to my image</div>"
  },
  {
    id: 3,
    name: "button",
    contents: "<div style='border:1px solid; color:red'>Welcome to my button</div>"
  }
]

const Preview = (props) => {
  const [preview, setPreview] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElementToPreview(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = preview[dragIndex];
    setPreview(update(preview, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
        ],
    }));
  }, [preview]);

  const addElementToPreview = (id, index) => {
    const fieldList = FieldList.filter((field) => id === field.id);
    setPreview((preview) => [...preview, fieldList[0]]);
  };

  const renderCard = (card, index) => {
    return (<Field key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} name={card.name}/>);
};
  return (<div className="preview" ref={drop}>
        {preview.map((card, i) => renderCard(card, i))}
    </div>
  );
  
};

export default Preview;
