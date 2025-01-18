import { ToolbarProps } from "../../types";
import { BLOCK_TYPES, INLINE_STYLES } from "../constants";


export const DefaultToolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
  onToggleBlockType,
}) => {

  return (
    <div className="RichEditor-toolbar">
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) => (
          <button
            key={type.label}
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleInlineStyle(type.style);
            }}
            className={
              editorState.getCurrentInlineStyle().has(type.style)
                ? "RichEditor-styleButton RichEditor-activeButton"
                : "RichEditor-styleButton"
            }
          >
            {type.label}
          </button>
        ))}
      </div>
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) => (
          <button
            key={type.label}
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleBlockType(type.style);
            }}
            className={
              editorState
                .getCurrentContent()
                .getBlockForKey(editorState.getSelection().getStartKey())
                .getType() === type.style
                ? "RichEditor-styleButton RichEditor-activeButton"
                : "RichEditor-styleButton"
            }
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};
