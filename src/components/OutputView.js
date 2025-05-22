import { useMemo } from 'react';

const OutputView = ({ editor, format, darkMode }) => {
  const output = useMemo(() => {
    if (!editor) return '';
    if (format === 'html') {
      return editor.getHTML();
    } else {
      return JSON.stringify(editor.getJSON(), null, 2);
    }
  }, [editor, format]);

  return (
    <pre className={`p-4 rounded-md overflow-auto max-h-60 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
      {output}
    </pre>
  );
};

export default OutputView;