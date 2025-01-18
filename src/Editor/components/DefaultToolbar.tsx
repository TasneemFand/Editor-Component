import { ToolbarProps } from "../../types";

export const DefaultToolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
  onToggleBlockType,
}) => {
  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "Monospace", style: "CODE" },
  ];

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "Blockquote", style: "blockquote" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
    { label: "Code Block", style: "code-block" },
  ];

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
