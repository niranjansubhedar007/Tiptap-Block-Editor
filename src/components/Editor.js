import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { createLowlight } from 'lowlight';

import Toolbar from './Toolbar';
import MenuBar from './MenuBar';
import OutputView from './OutputView';
import { useState } from 'react';

const lowlight = createLowlight();

const Editor = ({ darkMode }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [outputFormat, setOutputFormat] = useState('html');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: `
      <h1>Welcome to the Editor</h1>
      <p>Start writing here...</p>
    `,
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image :');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editor.chain().focus().setImage({ src: event.target.result }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
      <MenuBar editor={editor} darkMode={darkMode} />
      <Toolbar 
        editor={editor} 
        darkMode={darkMode} 
        addImage={addImage} 
        handleImageUpload={handleImageUpload} 
      />
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <EditorContent 
          editor={editor} 
          className={`min-h-[300px] p-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'prose-invert' : ''} prose max-w-none focus:outline-none`}
        />
      </div>
      <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setShowOutput(!showOutput)}
              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {showOutput ? 'Hide Output' : 'Show Output'}
            </button>
            {showOutput && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setOutputFormat('html')}
                  className={`px-3 py-1 rounded-md ${outputFormat === 'html' ? (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')}`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setOutputFormat('json')}
                  className={`px-3 py-1 rounded-md ${outputFormat === 'json' ? (darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white') : (darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')}`}
                >
                  JSON
                </button>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} ${!editor.can().undo() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className={`px-3 py-1 rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'} ${!editor.can().redo() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Redo
            </button>
          </div>
        </div>
        {showOutput && (
          <OutputView 
            editor={editor} 
            format={outputFormat} 
            darkMode={darkMode} 
          />
        )}
      </div>
    </div>
  );
};

export default Editor;