import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Search.css';
import qdrantLogo from '../qdrant-logo.svg';
import { Analytics } from "@vercel/analytics/react";

function Search() {
  const [query, setQuery] = useState('');
  const [notebooks, setNotebooks] = useState([]);
  const [filteredNotebooks, setFilteredNotebooks] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNotebooks() {
      try {
        const response = await fetch('/notebooks.json');
        if (!response.ok) {
          throw new Error('Failed to fetch notebooks');
        }
        const data = await response.json();
        setNotebooks(data.notebooks);
        setFilteredNotebooks(data.notebooks);
        
        // Extract all unique tags
        const tags = [...new Set(data.notebooks.flatMap(notebook => notebook.tags))];
        setAllTags(tags);
      } catch (error) {
        console.error('Error loading notebooks:', error);
      }
    }

    loadNotebooks();
  }, []);

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredNotebooks(notebooks);
    } else {
      const filtered = notebooks.filter(notebook => 
        selectedTags.every(tag => notebook.tags.includes(tag))
      );
      setFilteredNotebooks(filtered);
    }
  }, [selectedTags, notebooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement actual search functionality
    console.log("Search query:", query);
  };

  const handleNotebookClick = (filename) => {
    navigate(`/notebook/${filename}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const renderNotebooks = (notebooks) => (
    <div className="notebook-grid">
      {notebooks.map((notebook) => (
        <div key={notebook.filename} className="notebook-card" onClick={() => handleNotebookClick(notebook.filename)}>
          <div>
            <h3>{notebook.title}</h3>
            <p>{notebook.description}</p>
          </div>
          <div className="notebook-meta">
            <div className="notebook-tags">
              {notebook.tags.map((tag, index) => (
                <span key={index} className={`notebook-tag tag-${tag.replace(/\s+/g, '-')}`}>{tag}</span>
              ))}
            </div>
            <span className="notebook-date">{notebook.lastUpdated}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderNotebooksList = (notebooks) => (
    <ul className="notebooks-list">
      {notebooks.map((notebook) => (
        <li key={notebook.filename} onClick={() => handleNotebookClick(notebook.filename)}>
          <div className="notebook-list-item">
            <h3>{notebook.title}</h3>
            <div className="notebook-list-meta">
              <div className="notebook-tags">
                {notebook.tags.map((tag, index) => (
                  <span key={index} className={`notebook-tag tag-${tag.replace(/\s+/g, '-')}`}>{tag}</span>
                ))}
              </div>
              <span className="notebook-date">{notebook.lastUpdated}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="cookbook-layout">
      <header className="cookbook-header">
        <Link to="/" className="home-link">
          <img src={qdrantLogo} alt="Qdrant Logo" className="qdrant-logo" />
          <span className="cookbook-title">ETL Cookbook</span>
        </Link>
        <div className="header-right">
          <nav className="header-nav">
            <ul>
              <li className="dropdown">
                <a href="#" className="dropbtn">
                  Topics <span className="dropdown-arrow">▼</span>
                </a>
                <div className="dropdown-content">
                  <a href="#">All</a>
                  <a href="#">Data Loading</a>
                  <a href="#">Embeddings</a>
                  <a href="#">Search</a>
                  <a href="#">Advanced</a>
                  <a href="#">Maintenance</a>
                  <a href="#">Performance</a>
                </div>
              </li>
              <li><a href="#">About</a></li>
              <li><a href="https://qdrant.tech/documentation/" target="_blank" rel="noopener noreferrer">API Docs</a></li>
              <li>
                <a href="https://github.com/qdrant" target="_blank" rel="noopener noreferrer" className="contribute-link">
                  Contribute
                  <svg className="github-icon" height="20" width="20" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code snippets..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </header>
      <div className="content-wrapper">
        <main className="cookbook-main">
          {notebooks.length > 0 && (
            <section className="notebooks-section featured-section">
              <h2>Featured Notebook</h2>
              {renderNotebooks([notebooks[0]])}
            </section>
          )}
          <section className="notebooks-section">
            <h2>New Notebooks</h2>
            {renderNotebooks(notebooks.slice(1, 4))}
          </section>
          <section className="notebooks-section">
            <h2>Popular Notebooks</h2>
            {renderNotebooks(notebooks.slice(4, 7))}
          </section>
          <section className="notebooks-section all-notebooks">
            <h2>All Notebooks</h2>
            <div className="tag-filter">
              {allTags.map(tag => (
                <button 
                  key={tag} 
                  onClick={() => handleTagClick(tag)}
                  className={`filter-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {renderNotebooksList(filteredNotebooks)}
          </section>
        </main>
      </div>
      <Analytics />
    </div>
  );
}

export default Search;
