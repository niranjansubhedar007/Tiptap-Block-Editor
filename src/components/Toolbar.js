const Toolbar = ({ editor, darkMode, addImage, handleImageUpload }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-1 p-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'}`}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${editor.isActive('underline') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Underline"
      >
        <u>U</u>
      </button>
      <div className="h-6 border-r mx-1" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}></div>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-2 rounded ${editor.isActive('code') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Code"
      >
        &lt;&gt;
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${editor.isActive('blockquote') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Blockquote"
      >
        &rdquo;
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Horizontal Rule"
      >
        ―
      </button>
      <div className="h-6 border-r mx-1" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}></div>
      <button
        onClick={addImage}
        className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Insert Image from URL"
      >
        <span>🖼️ URL</span>
      </button>
      <label className={`p-2 rounded cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`} title="Upload Image">
        📁 Upload
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
      <div className="h-6 border-r mx-1" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}></div>
      <button
        onClick={() => editor.chain().focus().toggleLink({ href: 'https://example.com' }).run()}
        className={`p-2 rounded ${editor.isActive('link') ? (darkMode ? 'bg-gray-600' : 'bg-gray-300') : ''} ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
        title="Link"
      >
        🔗
      </button>
      {editor.isActive('link') && (
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={`p-2 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          title="Remove Link"
        >
          Unlink
        </button>
      )}
    </div>
  );
};

export default Toolbar;