import { Editor, Range, Path, Transforms } from 'slate';
import {ReactEditor} from 'slate-react';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export const createLinkNode = (href, text) => ({
  type: "link",
  href,
  children: [{ text }]
});

export const removeLink = (editor, options = {}) => {
  Transforms.unwrapNodes(editor, {
    ...options,
    match: (n) =>
      !Editor.isEditor(n) && n.type === "link"
  });
};

export const insertLink = (editor, url) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, "New Link");

  ReactEditor.focus(editor);

  if (!!selection) {
  const [parentNode, parentPath] = Editor.parent(
      editor,
      selection.focus || selection.focus.path
    );

    // Remove the Link node if we're inserting a new link node inside of another
    // link.
    if (parentNode.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parentNode)) {
      console.log('parent is void')
      // Insert the new link after the void node
      Transforms.insertNodes(editor, createParagraphNode([link]), {
        at: Path.next(parentPath),
        select: true
      });
    } else if (Range.isCollapsed(selection)) {
      // Insert the new link in our last known location
      Transforms.insertNodes(editor, link, { select: true });
      console.log('Range is collapsed')
    } 
    else {
      // Wrap the currently selected range of text into a Link
      Transforms.wrapNodes(editor, link, { split: true });
      // Remove the highlight and move the cursor to the end of the highlight
      Transforms.collapse(editor, { edge: "end" });
    }
  } 
  else {
    // Insert the new link node at the bottom of the Editor when selection is falsey
    Transforms.insertNodes(editor, createParagraphNode([link]));
  }
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)
  if (isActive) {
      Editor.removeMark(editor, format)
  } else {
      Editor.addMark(editor, format, true)
  }
}

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
      match: n => n.type === format,
  })
  return !!match
}

export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

export const createParagraphNode = (children = [{ text: "" }]) => ({
  type: "paragraph",
  children
});
