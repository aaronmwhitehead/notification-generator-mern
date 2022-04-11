import React, { Component } from "react";
import '../../../styles/css/ButtonEditor.css'
import '../../../styles/css/App.css'
import { MdOutlineOpenInNew } from 'react-icons/md';
import Align from '../editor/Align'
import { v4 as uuid } from 'uuid';

class ButtonEditor extends Component {
  constructor(props) {
    super(props);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleAlignChange = this.handleAlignChange.bind(this);
    this.uuid = uuid();
  }

  handleURLChange = (e) => {
    this.props.onInputChange(e.target.value);
  }

  handleLabelChange = (e) => {
    this.props.onLabelChange(e.target.value);
  }

  handleAlignChange = (value) => {
    this.props.onAlignChange(value);
  }

  render() {
    return(
      <div className="button-editor content-editor">
        {/* <MdOutlineArrowBack size={16} className="back-arrow" onClick={(e) => {e.target.parentNode.parentNode.parentNode.blur()}} /> */}
        <div className="editor-section">
          <div className="header">
            <span className="label">LINK</span>
            <a href={this.props.url} className="link-preview" target="_blank" rel="noopener noreferrer"><MdOutlineOpenInNew size={14} /></a>
          </div>
          <input value={this.props.url} className="input" onChange={(e) => this.handleURLChange(e)} type='text'></input>
        </div>
        <div className="editor-section">
          <div className="header">
            <span className="label">LABEL</span>
          </div>
          <input value={this.props.label} className="input" onChange={(e) => this.handleLabelChange(e)} type='text' maxLength={21}></input>
        </div>
        <div className="editor-section">
          <div className="header editor-section-align">
            <span className="label">ALIGNMENT</span>
            <Align defaultAlign={this.props.defaultAlign} uuid={this.uuid} passAlignChange={(value) => this.handleAlignChange(value)}/>
          </div>
        </div>
      </div>  
    )
  }
  
}

export default ButtonEditor;