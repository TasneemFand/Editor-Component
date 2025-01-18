import React, { useCallback, useMemo, useState } from "react";
import { Editor, EditorState } from "draft-js";
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
  const [internalState, setinternalState] = useState(
    value || EditorState.createEmpty()
  );

  const editorState = value ?? internalState;

  const handleChange = useCallback((state: EditorState) => {
    if (onChange) {
      onChange(state);
    } else {
      setinternalState(state);
    }
  }, [onChange]);

  const { toggleInlineStyle, toggleBlockType, getBlockStyle } = useEditorStyles(
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

  const hidePlaceHolder = useMemo(() => {
    const currentContent = editorState.getCurrentContent();
    return !currentContent.hasText() &&
      currentContent.getBlockMap().first().getType() !== "unstyled"
      ? "RichEditor-hidePlaceholder"
      : "";
  }, [editorState]);

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
        data-testid="editor-root"
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
