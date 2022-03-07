import React, { useState, useMemo, useCallback } from 'react'
// Import the Slate editor factory.
import { createEditor, Editor, Transforms, Text } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import DefaultElement from './DefaultElement'
import Leaf from './Leaf'

const TextInput = props => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ])

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(props => {
    return <DefaultElement {...props} />
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }
          switch (event.key) {
            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { bold: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true }
              )
              break;
            }
            case 'u': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { underline: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true }
              )
              break;
            }
            case 'i': {
              event.preventDefault()
              Transforms.setNodes(
                editor,
                { italic: true },
                // Apply it to text nodes, and split the text node up if the
                // selection is overlapping only part of it.
                { match: n => Text.isText(n), split: true }
              )
              break;
            }
          }
        }}
      />
    </Slate>
  )
}

export default TextInput;