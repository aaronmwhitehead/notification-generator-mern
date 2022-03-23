import '../../styles/css/App.css';
import React from 'react'
import RichEditor from './text/RichEditor';
import Image from './image/Image';
import AnchorButton from './button/AnchorButton'

const Field = (props) => {
  switch (props.type) {
    case 'Text':
      return (
        <div className='component-container'>
          <div className='text-input' tabIndex={0}>
            <RichEditor/>
          </div>
        </div>
      )
    case 'Image':
      return (
        <div className='component-container'>
          <Image/>
        </div>
      )
    case 'Button':
    return (
      <div className='component-container'>
        <AnchorButton/>
      </div>
    )
    default:
      break;
  }
};

export default Field;
