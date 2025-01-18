import { EditorState } from "draft-js";

export type GenericRichEditorProps = {
  value?: EditorState;
  onChange?: (state: EditorState) => void;
  renderToolbar?: (props: ToolbarProps) => React.ReactNode;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
};

export type ToolbarProps = {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
  onToggleBlockType: (blockType: string) => void;
};
