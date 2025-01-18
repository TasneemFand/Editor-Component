import { useCallback } from "react";
import { EditorState, RichUtils } from "draft-js";

export const useEditorStyles = (editorState: EditorState, handleChange: (state: EditorState) => void) => {
  const toggleInlineStyle = useCallback(
    (style: string) => {
      handleChange(RichUtils.toggleInlineStyle(editorState, style));
    },
    [editorState, handleChange]
  );

  const toggleBlockType = useCallback(
    (blockType: string) => {
      handleChange(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, handleChange]
  );

  return { toggleInlineStyle, toggleBlockType };
};
