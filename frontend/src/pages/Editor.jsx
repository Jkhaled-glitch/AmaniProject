import React, { useEffect, useState } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { Header } from '../components';
import { EditorData } from '../data/dummy';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Editor = () => {
  const [isEditorOpen, setEditorOpen] = useState(true);
  const { id } = useParams(); // Fix the usage of useParams

  useEffect(() => {
    fetchDescription();
  }, []);

  const [Description, setDescription] = useState(''); // Initialize with an empty string

  const fetchDescription = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/Description/${id}`);
      console.log(response.data);
      setDescription(response.data.Description); // Assuming your API response has a 'description' field
    } catch (error) {
      console.error('Error fetching description:', error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {isEditorOpen && (
        <div className="relative">
          <Header title="Task Description" />
          <div className="mt-12">
            <RichTextEditorComponent value={Description}>
              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
            </RichTextEditorComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
