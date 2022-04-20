import React from 'react';
import {useSlate} from 'slate-react';
import {
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdLooksOne, MdLooksTwo, MdLooks3, MdLooks4, MdLooks5, MdLooks6,
} from 'react-icons/md';
import { Button } from './Button';
import { isBlockActive, toggleBlock } from './utils';
import { BsJustify, BsTextCenter, BsTextLeft, BsTextRight } from 'react-icons/bs';

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']


const BlockButton = ({ format, icon, align }) => {
  const editor = useSlate();
  let iconCompo = null;
  switch (icon) {
      case 'heading-one':
        iconCompo = (<MdLooksOne title="Heading 1" size={24} />);
        break;
      case 'heading-two':
        iconCompo = (<MdLooksTwo title="Heading 2" size={24} />);
        break;
      case 'heading-three':
        iconCompo = (<MdLooks3 title="Heading 3" size={24} />);
        break;
      case 'heading-four':
        iconCompo = (<MdLooks4 title="Heading 4" size={24} />);
        break;
      case 'heading-five':
        iconCompo = (<MdLooks5 title="Heading 5" size={24} />);
        break;
      case 'heading-six':
        iconCompo = (<MdLooks6 title="Heading 6" size={24} />);
        break;
      case 'format_list_numbered':
        iconCompo = (<MdFormatListNumbered title="Numbered List" size={24} />);
        break;
      case 'format_list_bulleted':
        iconCompo = (<MdFormatListBulleted title="Bulleted List" size={24} />);
        break;
      case 'align_left':
        iconCompo = (<BsTextLeft title="Align Left" size={24} />);
        break;
      case 'align_right':
        iconCompo = (<BsTextRight title="Align Right" size={24} />);
        break;
      case 'align_center':
        iconCompo = (<BsTextCenter title="Align Center" size={24} />);
        break;
      case 'align_justify':
        iconCompo = (<BsJustify title="Justify" size={24} />);
        break;
      default:
        break;
  }

  return (
      <Button
          active={isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')}
          onMouseDown={event => {
            event.preventDefault()
            toggleBlock(editor, format, align)
          }}
      >
          {iconCompo}
      </Button>
  )
}

export default BlockButton;