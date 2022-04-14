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

  handleSizeChange = (e, name) => {
    if(e.target.value > 620)
      e.target.value = 620;
    if(e.target.value < 0)
      e.target.value = 0 
    if(name === 'height') {
      this.setState({
        naturalHeight: e.target.value
      })
    } else {
      this.setState({
        naturalWidth: e.target.value
      })
    }
    this.props.onSizeChange(e.target);
  }
  
  render() {
    return(
      <div className="image-editor content-editor">
        <div className="editor-section">
          <div className="header">
            <span className="label">IMAGE URL</span>
          </div>
          <input value={this.props.url !== '../assets/default-banner.png' ? this.props.url : ''} className="input" onChange={(e) => this.handleChange(e)} type='text'></input>
        </div>
        <div className="editor-section">
          <div className="header editor-section-align">
            <span className="label">ALIGNMENT</span>
            <Align defaultAlign={this.props.defaultAlign} uuid={this.uuid} passAlignChange={(value) => this.handleAlignChange(value)}/>
          </div>
        </div>
        <div className="editor-section editor-dimensions">
          <div className="scale-container">
            <div className="label">SCALE</div>
            <input className="input scale" onChange={(e) => this.handleSizeChange(e, e.target.name)} name="width" type="range" min="0" max="620" defaultValue={this.props.width}></input>
          </div>
        </div>
      </div>  
    )
  }
  
}

export default ImageEditor;