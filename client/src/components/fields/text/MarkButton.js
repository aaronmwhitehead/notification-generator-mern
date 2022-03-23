import React from 'react';
import {useSlate} from 'slate-react';
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdOutlineLink
} from 'react-icons/md';
import { Button } from './Button';
import { isMarkActive, toggleMark } from './utils';

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  let iconCompo = null;
  switch (icon) {
      case 'format_bold':
          iconCompo = (<MdFormatBold size={24} />);
          break;
      case 'format_italic':
          iconCompo = (<MdFormatItalic size={24} />);
          break;
      case 'format_underlined':
          iconCompo = (<MdFormatUnderlined size={24} />);
          break;
      case 'format_link':
        iconCompo = (<MdOutlineLink size={24} />);
        break;
      default:
        break;
  }

  return (
      <Button
          active={isMarkActive(editor, format)}
          onMouseDown={event => {
              event.preventDefault()
              toggleMark(editor, format)
          }}
      >
          {iconCompo}
      </Button>
  )
}

export default MarkButton;