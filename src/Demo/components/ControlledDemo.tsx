import { useState } from "react";
import { GenericRichEditor } from "../../Editor";
import { EditorState } from "draft-js";

const ControlledDemo = () => {
  const [content, setContent] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const handleChange = (newContent: EditorState) => {
    setContent(newContent);
  };

  return (
    <GenericRichEditor
      value={content}
      onChange={handleChange}
      placeholder="Controlled editor"
    />
  );
};

export default ControlledDemo;
