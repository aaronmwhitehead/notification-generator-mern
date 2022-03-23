import React, { Component } from "react";
import '../../../styles/css/ImageEditor.css'
import '../../../styles/css/App.css'

class ImageEditor extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.props.onInputChange(e.target.value);
  }
  render() {
    return(
      <div className="image-editor">
        <div className="editor-section">
          <div className="header">
            <span className="label">Image URL</span>
          </div>
          <input className="url-input" onChange={(e) => this.handleChange(e)} type='text'></input>
        </div>
      </div>  
    )
  }
  
}

export default ImageEditor;