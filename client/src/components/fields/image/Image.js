import React, { Component } from "react";
import ImageEditor from './ImageEditor';

class Image extends Component{
  imgRef = React.createRef();

  constructor(props) {
    super(props);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAlignChange = this.handleAlignChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.state = {
      url: this.props.item.fieldProps.url,
      align: this.props.item.fieldProps.align,
      height: this.props.item.fieldProps.height,
      width: this.props.item.fieldProps.width
    };
  }

  handleImageChange(url) {
    if(url === '') {
      url = '../assets/default-banner.png'
    }

    this.setState({
      url: url,
    });

    this.props.onURLChange(url);
  }

  handleAlignChange(value) {
    this.setState({
      align: value,
    });

    this.props.onAlignChange(value);
  }

  handleSizeChange(target) {
    if(target.name === "width") {
      this.setState({
        width: target.value,
      });
    } else if(target.name === "height") {
      this.setState({
        height: target.value,
      });
    }
    this.props.onSizeChange(target);
  }
  setDefaultDimensions() {
    if(this.state.width == null) {
      this.setState({
        width: this.imgRef.current.naturalWidth >= 620 ? 620 : this.imgRef.current.naturalWidth,
        height: this.imgRef.current.naturalWidth >= 620 ? Math.ceil(620 * this.imgRef.current.naturalHeight/this.imgRef.current.naturalWidth) : this.imgRef.current.naturalHeight
      }, (() => {this.props.onNewImage(this.state.width)}))
    }
  };

  render() {
    return(
      <div className='image-container' tabIndex={0} style={{ justifyContent: this.state.align }}>
        <ImageEditor url={this.state.url} width={this.state.width} height={this.state.height} defaultAlign={this.state.align} onInputChange={this.handleImageChange} onAlignChange={this.handleAlignChange} onSizeChange={this.handleSizeChange}/>
        <img alt={`CAI_Image${this.state.width}x${this.state.height}`} ref={this.imgRef} onLoad={() => this.setDefaultDimensions()} width={this.state.width} src={this.state.url}></img>
      </div>  
    )
  }
}

export default Image;