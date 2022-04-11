import React, { Component } from "react";
import { 
  MdOutlineAlignHorizontalRight, 
  MdOutlineAlignHorizontalCenter, 
  MdOutlineAlignHorizontalLeft 
} from 'react-icons/md';

class Align extends Component{
  constructor(props) {
    super(props);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.size = 16;
  }

  handleRadioChange = (e) => {
    this.props.passAlignChange(e.target.value);
  }

  render() {
    return(
      <div className="align-buttons">
        <input 
          type="radio" 
          className="align-button" 
          name={this.props.uuid} 
          value="flex-start"
          defaultChecked={this.props.defaultAlign === 'flex-start' ? true : false}
          id={this.props.uuid + '-left'}
          onChange={(e) => this.handleRadioChange(e)}></input>
        <label htmlFor={this.props.uuid + '-left'} className="align-icon align-left"><MdOutlineAlignHorizontalLeft size={this.size} /></label>
        <input 
          type="radio" 
          className="align-button align-center" 
          name={this.props.uuid} 
          value="center" 
          defaultChecked={this.props.defaultAlign === 'center' ? true : false}
          id={this.props.uuid + '-center'}
          onChange={(e) => this.handleRadioChange(e)}></input>
        <label htmlFor={this.props.uuid + '-center'} className="align-icon align-center"><MdOutlineAlignHorizontalCenter size={this.size} /></label>
        <input 
          type="radio" 
          className="align-button align-right" 
          name={this.props.uuid} 
          value="flex-end"
          defaultChecked={this.props.defaultAlign === 'flex-end' ? true : false} 
          id={this.props.uuid + '-right'}
          onChange={(e) => this.handleRadioChange(e)}></input>
        <label htmlFor={this.props.uuid + '-right'} className="align-icon align-right"><MdOutlineAlignHorizontalRight size={this.size} /></label>
      </div>
      
    )
  }
}

export default Align;