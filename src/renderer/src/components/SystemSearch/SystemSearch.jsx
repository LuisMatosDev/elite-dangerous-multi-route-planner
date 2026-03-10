import React, { useState, useCallback } from 'react';
import './SystemSearch.css';

export function SystemSearch({ onSelect, placeholder = 'Search visited system...' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async (value) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsSearching(true);
    try {
      const systems = await window.electronAPI.searchSystems(value);
      setResults(systems);
      setIsOpen(systems.length > 0);
    } catch (err) {
      console.error('System search failed:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSelect = (system) => {
    setQuery(system.name);
    setResults([]);
    setIsOpen(false);
    if (onSelect) onSelect(system);
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div className="system-search">
      <input
        className={`system-search__input ${isSearching ? 'searching' : ''}`}
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={handleBlur}
        onFocus={() => query.length >= 2 && setIsOpen(results.length > 0)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
      />
      {isOpen && (
        <ul className="system-search__results">
          {results.map((system) => (
            <li
              key={system.name}
              className="system-search__result-item"
              onMouseDown={() => handleSelect(system)}
            >
              <span className="system-search__result-name">{system.name}</span>
              {system.coords && (
                <span className="system-search__result-coords">
                  {system.coords.x.toFixed(1)} / {system.coords.y.toFixed(1)} / {system.coords.z.toFixed(1)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {!isOpen && query.length >= 2 && !isSearching && results.length === 0 && (
        <div className="system-search__no-results">
          No visited systems found
        </div>
      )}
    </div>
  );
}
