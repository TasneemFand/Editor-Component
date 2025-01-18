import React, { useState } from "react";
import { ContentBlock, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import "./style.css";
import { GenericRichEditorProps } from "../types";
import { DefaultToolbar } from "./components/DefaultToolbar";
import { useEditorStyles } from "./hooks/useEditorStyles";

export const GenericRichEditor: React.FC<GenericRichEditorProps> = ({
  value,
  onChange,
  renderToolbar,
  placeholder = "Type Something...",
  className = "",
  style = {},
}) => {
  const [editorState, setEditorState] = useState(
    value || EditorState.createEmpty()
  );

  const handleChange = (state: EditorState) => {
    if (onChange) {
      onChange(state);
    } else {
      setEditorState(state);
    }
  };
  const { toggleInlineStyle, toggleBlockType } = useEditorStyles(
    editorState,
    handleChange
  );

  const styleMap: Record<string, React.CSSProperties> = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block: ContentBlock): string {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  }

  const currentContent = editorState.getCurrentContent();
  const hidePlaceHolder =
    !currentContent.hasText() &&
    currentContent.getBlockMap().first().getType() !== "unstyled"
      ? "RichEditor-hidePlaceholder"
      : "";

  return (
    <div className={`RichEditor-root`}>
      {renderToolbar ? (
        renderToolbar({
          editorState,
          onToggleInlineStyle: toggleInlineStyle,
          onToggleBlockType: toggleBlockType,
        })
      ) : (
        <DefaultToolbar
          editorState={editorState}
          onToggleInlineStyle={toggleInlineStyle}
          onToggleBlockType={toggleBlockType}
        />
      )}
      <div
        className={`${hidePlaceHolder} ${className || "RichEditor-editor"}`}
        style={style}
      >
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={handleChange}
          placeholder={placeholder}
          spellCheck={true}
        />
      </div>
    </div>
  );
};
