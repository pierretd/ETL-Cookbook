import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import entriesData from '../data/entries.json';

function EntryDetail() {
  const [entry, setEntry] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const foundEntry = [...entriesData.new, ...entriesData.popular].find(
      (e) => e.id === parseInt(id)
    );
    setEntry(foundEntry);
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div className="entry-detail">
      <Link to="/">Back to Search</Link>
      <h1>{entry.title}</h1>
      <p>{entry.description}</p>
      <span className="result-category">{entry.category}</span>
      <div className="entry-content">{entry.content}</div>
    </div>
  );
}

export default EntryDetail;
