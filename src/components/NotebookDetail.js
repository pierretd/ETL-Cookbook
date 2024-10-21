import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function NotebookDetail() {
  const [notebook, setNotebook] = useState(null);
  const { filename } = useParams();

  useEffect(() => {
    async function loadNotebook() {
      try {
        const response = await fetch('/notebooks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch notebooks');
        }
        const data = await response.json();
        const foundNotebook = data.notebooks.find(n => n.filename === filename);
        if (foundNotebook) {
          setNotebook(foundNotebook);
        } else {
          throw new Error('Notebook not found');
        }
      } catch (error) {
        console.error('Failed to load notebook:', error);
      }
    }

    loadNotebook();
  }, [filename]);

  if (!notebook) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notebook-detail">
      <Link to="/search">Back to Notebooks</Link>
      <h1>{notebook.title}</h1>
      <div className="notebook-meta">
        <span className="notebook-category">{notebook.category}</span>
        <span className="notebook-filename">{notebook.filename}</span>
        <span className="notebook-updated">Last updated: {notebook.lastUpdated}</span>
      </div>
      <p>{notebook.description}</p>
      <div className="notebook-content">
        {/* Here you would render the actual notebook content */}
        <p>Notebook content goes here...</p>
      </div>
    </div>
  );
}

export default NotebookDetail;
