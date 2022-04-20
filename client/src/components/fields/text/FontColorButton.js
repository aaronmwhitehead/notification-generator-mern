import React, { useState, useEffect } from 'react'
import {useSlate} from 'slate-react';
import { Button } from './Button';
import { isBlockActive, adjustMark } from './utils';
import { FaFont } from 'react-icons/fa';
import { Editor } from 'slate';
import { BiFontColor } from 'react-icons/bi';

const FontColorButton = (props) => {
  const editor = useSlate();

  const [value, setValue] = useState(
    {
      color: '#575757'
    }
  )
  
  const handleChange = ((event) => {
    setValue({
      color: Editor.marks(editor).color
    })
    adjustMark(editor, props.format, event.target.value)
  })

  return (
    <label htmlFor='color'>
      <BiFontColor size={24} title="Font Color" color={value.color}/>
      <input onChange={(e) => handleChange(e)} type="color" id="color" name="color" defaultValue={value.color} style={{display: "none"}}></input>
    </label>
    
  )
}

export default FontColorButton;