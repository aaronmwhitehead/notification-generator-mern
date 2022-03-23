import React, { Component } from "react";
import '../../../styles/css/ButtonEditor.css'
import '../../../styles/css/App.css'
import { MdOutlineOpenInNew } from 'react-icons/md';

class ButtonEditor extends Component {
  constructor(props) {
    super(props);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
  }

  handleURLChange = (e) => {
    this.props.onInputChange(e.target.value);
  }

  handleLabelChange = (e) => {
    console.log('label changed')
    this.props.onLabelChange(e.target.value);
  }

  render() {
    return(
      <div className="button-editor">
        <div className="editor-section">
          <div className="header">
            <span className="label">Link</span>
            <a href={this.props.url} className="link-preview" target="_blank" rel="noopener noreferrer"><MdOutlineOpenInNew size={14} /></a>
          </div>
          <input value={this.props.url} className="url-input" onChange={(e) => this.handleURLChange(e)} type='text'></input>
        </div>
        <div className="editor-section">
          <div className="header">
            <span className="label">Label</span>
          </div>
          <input value={this.props.label} className="url-input" onChange={(e) => this.handleLabelChange(e)} type='text'></input>
        </div>
      </div>  
    )
  }
  
}

export default ButtonEditor;