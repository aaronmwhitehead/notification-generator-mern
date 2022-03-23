import React, { Component, useState } from "react";
import ButtonEditor from './ButtonEditor';

class AnchorButton extends Component{
  constructor(props) {
    super(props);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.state = {
      url: 'http://cox.sumtotal.host',
      label: 'Button', 
      class: 'button'
    };
  }

  showEditor = (() => {
    console.log('focused');
  });

  handleLinkChange(url) {
    this.setState({
      url: url,
    });
  }

  handleLabelChange(text) {
    this.setState({
      label: text
    });
  }

  render() {
    return(
      <div onFocus={this.showEditor} className='button-container' tabIndex={0}>
        <ButtonEditor url={this.state.url} label={this.state.label} onLabelChange={this.handleLabelChange} onInputChange={this.handleLinkChange}/>
        <div className='button-template'>
          <div className='button-body'>
            <span href={this.state.url} className='button-label'>{this.state.label}</span>
          </div>
        </div>  
      </div>  
    )
  }
}

export default AnchorButton;