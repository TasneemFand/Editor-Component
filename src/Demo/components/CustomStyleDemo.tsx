import { GenericRichEditor } from "../../Editor";

const CustomStyleDemo: React.FC = () => {
  return (
    <GenericRichEditor
      placeholder="Type here with custom styles"
      style={{
        backgroundColor: "black",
        color: "white"
      }}
    />
  );
};

export default CustomStyleDemo;
