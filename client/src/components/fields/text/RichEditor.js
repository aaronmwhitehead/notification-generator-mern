import React, { useState, useRef, useCallback } from 'react';
import { createEditor } from 'slate';
import {
  Slate, Editable, withReact} from 'slate-react';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import { LinkButton } from './LinkButton';
import Element from './Element';
import Leaf from './Leaf'
import { Toolbar } from './Toolbar';
import MarkButton from './MarkButton';
import BlockButton from './BlockButton';
import { toggleMark } from './utils';
import { withKeyCommands } from './withKeyCommands';
import { withLinks } from './withLinks';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
};

export default function RichEditor(props) {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editorRef = useRef()
    if (!editorRef.current) {
      editorRef.current = withReact(withHistory(withLinks(withKeyCommands(createEditor()))))
    } 
    const editor = editorRef.current
    const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])

    return (
        <Slate editor={editor} value={value} onChange={value => setValue(value)}>
            <Toolbar className="slate-toolbar">
                <MarkButton className='icon icon-bold' format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <BlockButton format="heading-one" icon="heading-one" />
                <BlockButton format="heading-two" icon="heading-two" />
                <BlockButton format="heading-three" icon="heading-three" />
                <BlockButton format="heading-four" icon="heading-four" />
                <BlockButton format="heading-five" icon="heading-five" />
                <BlockButton format="heading-six" icon="heading-six" />
                <BlockButton format="numbered-list" icon="format_list_numbered" />
                <BlockButton format="bulleted-list" icon="format_list_bulleted" />
                <LinkButton format="link" icon="format_link" />
            </Toolbar>
            <Editable 
                className="slate-editor"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                spellCheck
                autoFocus
                onBlur={(event => {
                  event.preventDefault();
                  const target = event.currentTarget;
                  if(event.relatedTarget)
                    console.log(event.relatedTarget.classList.contains('slate-toolbar'));

                  if(event.relatedTarget && event.relatedTarget.classList.contains('slate-toolbar')) {
                    setTimeout(() => { target.focus(); });
                  }
                })}
                onKeyDown={event => {
                  for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event)) {
                          event.preventDefault()
                          const mark = HOTKEYS[hotkey]
                          toggleMark(editor, mark)
                      }
                  }
                }}
            />
        </Slate>
    )
};