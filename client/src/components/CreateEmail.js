import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import ElementTable from "./element/ElementTable";
import Preview from "./Preview";
import axios from "axios";

const CreateEmail = (props) => {
  return (<div className="content-body">
      <div className="nav-header">LEARN@COX EMAIL TEMPLATE GENERATOR</div>
      <div className="container-main">
        <ElementTable/>
        <Preview/>
      </div>
      
    </div>
  );
  
};

export default CreateEmail;
