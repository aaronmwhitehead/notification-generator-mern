import React, { Component } from "react";
import '../../../styles/css/ImageEditor.css'
import '../../../styles/css/App.css'
import { v4 as uuid } from 'uuid';
import Align from "../editor/Align";

class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleAlignChange = this.handleAlignChange.bind(this);
    this.uuid = uuid();
  }

  handleChange = (e) => {
    this.props.onInputChange(e.target.value);
  }

  handleAlignChange = (value) => {
    this.props.onAlignChange(value);
  }

  handleSizeChange = (e) => {
    if(e.target.value > 620)
      e.target.value = 620;
    if(e.target.value < 0)
      e.target.value = 0 
    this.props.onSizeChange(e.target);
  }
  
  render() {
    return(
      <div className="image-editor content-editor">
        <div className="editor-section">
          <div className="header">
            <span className="label">IMAGE URL</span>
          </div>
          <input className="input" onChange={(e) => this.handleChange(e)} type='text'></input>
        </div>
        <div className="editor-section">
          <div className="header editor-section-align">
            <span className="label">ALIGNMENT</span>
            <Align defaultAlign={this.props.defaultAlign} uuid={this.uuid} passAlignChange={(value) => this.handleAlignChange(value)}/>
          </div>
        </div>
        <div className="editor-section">
          <div className="label">WIDTH</div>
          <input onChange={(e) => this.handleSizeChange(e)} name="width" className="input" type="number" min="0" max="620" step={5} defaultValue="45"></input>
          <div className="label">HEIGHT</div>
          <input onChange={(e) => this.handleSizeChange(e)} name="height" className="input" type="number" min="0" max="620" step={5} defaultValue="40"></input>
        </div>
      </div>  
    )
  }
  
}

export default ImageEditor;