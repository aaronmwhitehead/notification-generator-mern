import '../../styles/css/App.css';
import React, { useState } from 'react'
import RichEditor from './text/RichEditor';
import Image from './image/Image';
import AnchorButton from './button/AnchorButton'
import { useEffect } from 'react';

const Field = (props) => {
  const [value, setValue] = useState(
    {
      content: props.item.content,
      id: props.item.id,
      fieldProps: {
        url: props.item.fieldProps.url,
        align: props.item.fieldProps.align,
        width: props.item.fieldProps.width,
        height: props.item.fieldProps.height,
        label: props.item.fieldProps.label,
        editor: props.item.fieldProps.editor
      }
    }
  )
  
  useEffect(() => {
    props.onStateChange(value);
  }, [value]);

  const handleAlignChange = (alignmentValue) => {
    setValue({
      ...value,
      fieldProps: {
        ...value.fieldProps,
        align: alignmentValue
      },
    });
  }

  const handleSizeChange = (target) => {
    setValue({
      ...value,
      fieldProps: {
        ...value.fieldProps,
        width: target.name === 'width' ? target.value : value.fieldProps.width,
        height: target.name === 'height' ? target.value : value.fieldProps.height
      },
    });
  }

  const handleURLChange = (url) => {
    setValue({
      ...value,
      fieldProps: {
        ...value.fieldProps,
        url: url
      },
    });
  }

  const handleLabelChange = (label) => {
    setValue({
      ...value,
      fieldProps: {
        ...value.fieldProps,
        label: label
      },
    });
  }

  const handleTextChange = (data) => {
    setValue({
      ...value,
      fieldProps: {
        ...value.fieldProps,
        editor: data
      }
    })
  }
  
  switch (props.type) {
    case 'Text':
      return (
        <div className='component-container'>
          <div className='text-input' tabIndex={0}>
            <RichEditor item={value} onTextChange={(data) => handleTextChange(data)}/>
          </div>
        </div>
      )
    case 'Image':
      return (
        <div className='component-container'>
          <Image item={value} onURLChange={(url) => handleURLChange(url)} onSizeChange={(target) => handleSizeChange(target)} onAlignChange={(alignmentValue) => handleAlignChange(alignmentValue)}/>
        </div>
      )
    case 'Button':
    return (
      <div className='component-container'>
        <AnchorButton item={value} onURLChange={(url) => handleURLChange(url)} onAlignChange={(alignmentValue) => handleAlignChange(alignmentValue)} onLabelChange={(label) => handleLabelChange(label)}/>
      </div>
    )
    default:
      return null;
  }
};

export default Field;
