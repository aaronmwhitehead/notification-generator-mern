import React from 'react';
import {useSlate} from 'slate-react';
import { MdOutlineLink } from 'react-icons/md';
import { ImBold, ImItalic, ImUnderline } from 'react-icons/im'
import { Button } from './Button';
import { isMarkActive, toggleMark } from './utils';
import { BsPaintBucket } from 'react-icons/bs';

const ColorButton = ({ format, icon }) => {
  const editor = useSlate();
  let iconCompo = <BsPaintBucket size={20}/>;

  return (
      <Button
          active={isMarkActive(editor, format)}
          onMouseDown={event => {
              event.preventDefault()
              // toggleMark(editor, format)
          }}
      >
          {iconCompo}
      </Button>
  )
}

export default ColorButton;