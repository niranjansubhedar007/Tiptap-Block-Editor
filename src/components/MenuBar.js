const MenuBar = ({ editor, darkMode }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-1 p-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'}`}>
      <select
        value={editor.getAttributes('heading').level || 'paragraph'}
        onChange={(e) => {
          const level = e.target.value;
          if (level === 'paragraph') {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().toggleHeading({ level: parseInt(level) }).run();
          }
        }}
        className={`p-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
      >
        <option value="paragraph">Paragraph</option>
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
      </select>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Numbered List"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${editor.isActive('codeBlock') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Code Block"
      >
        Code Block
      </button>
    </div>
  );
};

export default MenuBar;