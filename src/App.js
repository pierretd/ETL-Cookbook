import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import backgroundImage from './Qdrant-Academy-Outro-1 (2).jpg';
import Search from './components/Search';
import NotebookDetail from './components/NotebookDetail';
import { Analytics } from "@vercel/analytics/react";

function Home() {
  return (
    <div className="App">
      <div className="top-text">
        <h2 className="cookbook-name">The Qdrant ETL Cookbook</h2>
        <p className="description">
          Your one-stop resource for loading any data type into Qdrant.
          Get instant, working code and expert advice on embedding models to kickstart your vector search applications.
        </p>
        <h1 className="coming-soon">Coming Soon...</h1>
      </div>
      <div className="background-container">
        <a href="https://qdrant.tech/" target="_blank" rel="noopener noreferrer" className="background-link">
          <img src={backgroundImage} alt="Background" className="background-image" />
        </a>
      </div>
      <div className="bottom-text">
        <p>
          <a href="https://forms.gle/Mns2YvCUUg8GChW48" target="_blank" rel="noopener noreferrer">
            Tell us what you want to see in the cookbook
          </a>
        </p>
        <p className="credits">
          Powered with <a href="https://qdrant.tech/" target="_blank" rel="noopener noreferrer">Qdrant</a>, Built by <a href="https://x.com/thierrypdamiba" target="_blank" rel="noopener noreferrer">Thierry Damiba</a>
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notebook/:filename" element={<NotebookDetail />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
