import { GenericRichEditor } from "../../Editor";
import { ToolbarProps } from "../../types";

const CustomToolbarDemo = () => {
  const customToolbar = ({ onToggleInlineStyle, editorState }: ToolbarProps) => (
    <div>
      <button
        className={
          editorState.getCurrentInlineStyle().has("BOLD")
            ? "RichEditor-styleButton RichEditor-activeButton"
            : "RichEditor-styleButton"
        }
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleInlineStyle("BOLD");
        }}
      >
        Custom Bold
      </button>
      <button
        className={
          editorState.getCurrentInlineStyle().has("ITALIC")
            ? "RichEditor-styleButton RichEditor-activeButton"
            : "RichEditor-styleButton"
        }
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleInlineStyle("ITALIC");
        }}
      >
        Custom Italic
      </button>
    </div>
  );

  return (
    <GenericRichEditor
      renderToolbar={customToolbar}
      placeholder="Custom toolbar"
    />
  );
};

export default CustomToolbarDemo;
