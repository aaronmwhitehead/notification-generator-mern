import React from 'react';
import {useSlateStatic} from 'slate-react';

import {
    MdOutlineLink
} from 'react-icons/md';
import { Button } from './Button';
import { insertLink } from './utils'

export const LinkButton = ({ format, icon }) => {
  const editor = useSlateStatic();
  let iconCompo = (<MdOutlineLink size={24} />);

  const handleInsertLink = () => {
    const url = prompt("Enter a URL"); // For simplicity
    insertLink(editor, url);
  };

  return (
      <Button onMouseDown={handleInsertLink}>
          {iconCompo}
      </Button>
  )
}