# Editor Component

A reusable WYSIWYG Editor Component built with React and draft-js. The component supports both controlled and uncontrolled behavior, customizable styling, and extendable toolbar functionality.

## Features:

- Controlled and Uncontrolled Modes:
  - Operates in controlled mode when value and onChange props are provided.
  - Operates in uncontrolled mode by managing its own internal state when no value prop is provided.

- Basic Toolbar:
  - Includes formatting actions for bold, italic, and underline.
  - Toolbar is extendable or replaceable via the renderToolbar prop.
  - 
- Styling:
  - Supports className and style props for customization.
  - Provides default styles for ease of use.
 
- Unit Tests:
  Comprehensive tests covering functionality, controlled/uncontrolled modes, and toolbar actions.

- Installation:
  - Install dependencies:
    run npm install
  
  - Run the development server:
    npm run dev

  - Run tests:
    npm run test
  
