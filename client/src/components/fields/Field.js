import ReactDOM from 'react-dom';
import '../../App.css';
import { useDrag, useDrop } from 'react-dnd';
// Import React dependencies.
import React, { useState } from 'react'

import TextInput from './text/TextInput';

const Field = (props) => {
  switch (props.type) {
    case 'Text':
      return (
        <div className='component-container'>
          <div className='text-input'>
            <TextInput/>
          </div>
        </div>
        // <div className='component-container'>
        //   <div 
        //     className='text-input' 
        //     contentEditable='true'
        //     onPaste={(e) => {
        //       e.preventDefault();
        //       const text = e.clipboardData.getData('text');
        //       document.execCommand('insertText', false, text);
        //     }}>
        //       Text
        //   </div>  
        // </div>
      )
    case 'Image':
      return (
        <div className='component-container'>
          <div className='image-container'>
            <img className='image-container-placeholder' src='../assets/default-banner.png'></img>
          </div>  
        </div>
      )
    case 'Button':
    return (
      <div className='component-container'>
        <div className='button-template'>
          <div className='button-body'>
            <span className='button-label'>Button</span>
          </div>
        </div>  
      </div>
    )
  }
};

export default Field;
