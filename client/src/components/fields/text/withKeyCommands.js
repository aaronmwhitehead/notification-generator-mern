import { Editor, Node, Path, Transforms } from "slate";

import { createParagraphNode } from "./utils";

export const withKeyCommands = (editor) => {
  const { deleteBackward, insertBreak, isVoid } = editor;

  editor.deleteBackward = (...args) => {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      editor.selection.focus.path
    );

    if (isVoid(parentNode) || !Node.string(parentNode).length) {
      Transforms.removeNodes(editor, { at: parentPath });
      const nextPath = Path.next(parentPath);
      if(nextPath[0] === 1) {
        Transforms.insertNodes(editor, createParagraphNode(), {
        at: parentPath,
        select: true
      });
      }
    } else {
      deleteBackward(...args);
    }
  };

  editor.insertBreak = (...args) => {
    const [parentNode, parentPath] = Editor.parent(
      editor,
      editor.selection.focus.path
    );

    if (isVoid(parentNode)) {
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(editor, createParagraphNode(), {
        at: nextPath,
        select: true
      });
    }
    else {
      insertBreak(...args);
    }
  };

  return editor;
};

export default withKeyCommands;
