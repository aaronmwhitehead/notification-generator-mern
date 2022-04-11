import React, { Component } from "react";
import ButtonEditor from './ButtonEditor';

class AnchorButton extends Component{
  constructor(props) {
    super(props);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handleLabelChange = this.handleLabelChange.bind(this);
    this.handleAlignChange = this.handleAlignChange.bind(this);
    this.state = {
      url: this.props.item.fieldProps.url,
      align: this.props.item.fieldProps.align,
      label: this.props.item.fieldProps.label, 
    };
  }

  handleLinkChange(url) {
    this.setState({
      url: url,
    });
    this.props.onURLChange(url);
  }

  handleLabelChange(text) {
    this.setState({
      label: text
    });
    this.props.onLabelChange(text);
  }

  handleAlignChange(value) {
    this.setState({
      align: value,
    });
    this.props.onAlignChange(value)
  }

  render() {
    return(
      <div className='button-container' tabIndex={0} style={{justifyContent: this.state.align}}>
        <ButtonEditor defaultAlign={this.state.align} url={this.state.url} label={this.state.label} onAlignChange={this.handleAlignChange} onLabelChange={this.handleLabelChange} onInputChange={this.handleLinkChange}/>
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