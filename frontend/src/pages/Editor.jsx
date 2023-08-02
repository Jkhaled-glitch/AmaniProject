import React, { useState } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header } from '../components';
import { EditorData } from '../data/dummy';

const Editor = () => {
  const [isEditorOpen, setEditorOpen] = useState(true);

  // Function to close the Editor and return to Kanban
  const handleCloseEditor = () => {
    setEditorOpen(false);
    // navigate('/kanban'); // You may uncomment this line if you want to use navigation
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {isEditorOpen && (
        <div className="relative">
          {/* Remove the close button */}
          {/* <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded absolute top-2 right-2 z-10"
            onClick={handleCloseEditor}
          >
            Close
          </button> */}
          <Header title="Task Description" />
          <div className="mt-12"> {/* Add some top margin to create space for the close button */}
            <RichTextEditorComponent>
              <EditorData />
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
