import { useCallback } from "react";
import { ContentBlock, EditorState, RichUtils } from "draft-js";

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
  const getBlockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  }

  return { toggleInlineStyle, toggleBlockType, getBlockStyle };
};
