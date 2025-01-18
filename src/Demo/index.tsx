import ControlledDemo from "./components/ControlledDemo";
import CustomStyleDemo from "./components/CustomStyleDemo";
import CustomToolbarDemo from "./components/CustomToolbarDemo";
import UncontrolledDemo from "./components/UncontrolledDemo";

export const DemoPage = () => {
  return (
    <div>
      <h1>WYSIWYG Editor Demo</h1>
      <h2>Uncontrolled Mode</h2>
      <UncontrolledDemo />
      <h2>Controlled Mode</h2>
      <ControlledDemo />
      <h2>Custom Toolbar</h2>
      <CustomToolbarDemo />
      <h2>Custom Style</h2>
      <CustomStyleDemo/>
    </div>
  );
};
