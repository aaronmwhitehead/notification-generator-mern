import React from 'react';
import {useSlate} from 'slate-react';
import { MdOutlineLink } from 'react-icons/md';
import { ImBold, ImItalic, ImUnderline } from 'react-icons/im'
import { Button } from './Button';
import { isMarkActive, toggleMark } from './utils';

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  let iconCompo = null;
  switch (icon) {
      case 'format_bold':
          iconCompo = (<ImBold title="Bold" size={20} />);
          break;
      case 'format_italic':
          iconCompo = (<ImItalic title="Italic" size={20} />);
          break;
      case 'format_underlined':
          iconCompo = (<ImUnderline title="Underline" size={20} />);
          break;
      case 'format_link':
        iconCompo = (<MdOutlineLink title="Add Link" size={24} />);
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