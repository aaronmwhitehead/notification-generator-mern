import React from 'react';
import {
  useSelected,
  useFocused,
  useSlateStatic} from 'slate-react';

import { MdOutlineOpenInNew, MdOutlineLinkOff } from 'react-icons/md';
import { removeLink } from './utils';

export const Link = ({ attributes, element, children }) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div className="element-link">
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <div className="popup" contentEditable={false}>
          <a href={element.href} rel="noopener noreferrer" target="_blank">
            <MdOutlineOpenInNew size={16} />
            {element.href}
          </a>
          <button onClick={() => removeLink(editor)}>
            <MdOutlineLinkOff  size={18} />
          </button>
        </div>
      )}
    </div>
  );
};