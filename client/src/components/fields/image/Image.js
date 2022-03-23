import React, { Component, useState } from "react";
import ImageEditor from './ImageEditor';

class Image extends Component{
  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      url: '../assets/default-banner.png',
      class: 'image-container-placeholder'
    };
  }

  showEditor = (() => {
    console.log('focused');
  });

  handleImageChange(url) {
    this.setState({
      url: url,
      class: 'image'
    });
  }

  render() {
    return(
      <div onFocus={this.showEditor} className='image-container' tabIndex={0}>
        <ImageEditor onInputChange={this.handleImageChange}/>
        <img alt='placeholder' className={this.state.class} src={this.state.url}></img>
      </div>  
    )
  }
}

export default Image;