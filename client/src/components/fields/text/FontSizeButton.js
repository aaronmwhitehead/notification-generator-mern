import React, { useState, useEffect } from 'react'
import {useSlate} from 'slate-react';
import { Button } from './Button';
import { isBlockActive, adjustMark } from './utils';
import { FaFont } from 'react-icons/fa';
import { Editor } from 'slate';

const FontSizeButton = (props) => {
  const editor = useSlate();

  const [value, setValue] = useState(
    {
      size: '16px'
    }
  )
  
  const handleChange = ((event) => {
    setValue({
      size: Editor.marks(editor).fontSize
    })
    adjustMark(editor, props.format, event.target.value)
  })

  useEffect(() => {
    // adjustSize(editor, props.format, value.size)
  });

  return (
    <select onChange={(e) => handleChange(e)} name="size" id="size" className='input-font-size' value={value.size}>
      <option value="8px">8px</option>
      <option value="10px">10px</option>
      <option value="12px">12px</option>
      <option value="13px">13px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
      <option value="24px">24px</option>
      <option value="32px">32px</option>
      <option value="36px">36px</option>
    </select>
  )
}

export default FontSizeButton;