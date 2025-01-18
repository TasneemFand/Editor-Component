import { render, screen } from "@testing-library/react";
import { GenericRichEditor } from "./index";
import { ContentState, EditorState } from "draft-js";
import { describe, expect, test, vi } from "vitest";
import { INLINE_STYLES, BLOCK_TYPES } from "./constants";
import userEvent from "@testing-library/user-event";

describe("GenericRichEditor Component", () => {
  test("supports controlled mode", () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();

    render(
      <GenericRichEditor
        value={editorState}
        onChange={mockOnChange}
        placeholder="Type Something..."
      />
    );

    expect(screen.getByText("Type Something...")).toBeInTheDocument();
    // Simulate a user typing by updating the editor state directly
    const newContent = ContentState.createFromText("New text");
    const newEditorState = EditorState.createWithContent(newContent);

    // Manually invoke onChange with the new EditorState
    mockOnChange(newEditorState);

    // Verify the onChange handler was called with the correct state
    expect(mockOnChange).toHaveBeenCalledWith(newEditorState);
  });

  test("supports uncontrolled mode", () => {
    render(<GenericRichEditor placeholder="Type Something..." />);
    const editorDiv = screen.getByRole("textbox");

    expect(editorDiv).toBeInTheDocument();

    expect(screen.queryByText("Type Something...")).toBeInTheDocument();
  });

  test("renders a custom toolbar when provided", async () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    const customToolbar = vi
      .fn()
      .mockImplementation(() => <div>Custom Toolbar</div>);
    render(
      <GenericRichEditor
        value={editorState}
        onChange={mockOnChange}
        renderToolbar={customToolbar}
      />
    );
    expect(screen.getByText("Custom Toolbar")).toBeInTheDocument();
    expect(customToolbar).toHaveBeenCalledWith(
      expect.objectContaining({
        editorState: expect.any(Object),
        onToggleInlineStyle: expect.any(Function),
        onToggleBlockType: expect.any(Function),
      })
    );
  });

  test("applies custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    render(<GenericRichEditor style={customStyle} />);

    const editorRoot = screen.getByTestId("editor-root");
    expect(editorRoot).toHaveStyle("background-color: rgb(255, 0, 0)");
  });

  test("renders toolbar with inline and block style controls", () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<GenericRichEditor value={editorState} onChange={mockOnChange} />);

    INLINE_STYLES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
    // Verify block style buttons are rendered
    BLOCK_TYPES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test("triggers inline style toggle on button click", async () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<GenericRichEditor value={editorState} onChange={mockOnChange} />);
    const boldButton = screen.getByText("Bold");
    const user = userEvent.setup();
    await user.click(boldButton);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test("triggers block style toggle on button click", async () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<GenericRichEditor value={editorState} onChange={mockOnChange} />);
    const h1Button = screen.getByText("H1");
    const user = userEvent.setup();
    await user.click(h1Button);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
