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
import ColorButton from './ColorButton';

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
};

const RichEditor = (props) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editorRef = useRef()
    if (!editorRef.current) {
      editorRef.current = withReact(withHistory(withLinks(withKeyCommands(createEditor()))))
    } 
    const editor = editorRef.current
    const [value, setValue] = useState(props.item.fieldProps.editor)

    const handleChange = (data) => {
      setValue(data);
      props.onTextChange(data);
    }

    return (
        <Slate editor={editor} value={value} onChange={(data) => handleChange(data)}>
            <Toolbar className="slate-toolbar">
                <MarkButton className='icon icon-bold' format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                {/* <ColorButton icon="color-picker"/> */}
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

export default RichEditor;