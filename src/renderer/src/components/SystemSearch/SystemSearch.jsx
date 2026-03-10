import React, { useState, useCallback, useId } from 'react';
import './SystemSearch.css';

export function SystemSearch({ onSelect, placeholder = 'Search visited system...' }) {
  const inputId = useId();
  const listboxId = useId();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSearch = useCallback(async (value) => {
    setQuery(value);
    setActiveIndex(-1);

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
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setActiveIndex(-1);
    if (onSelect) onSelect(system);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) handleSelect(results[activeIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(-1);
    }, 150);
  };

  return (
    <div className="system-search" role="combobox" aria-expanded={isOpen} aria-haspopup="listbox">
      <div className="system-search__field">
        <label htmlFor={inputId} className="system-search__label">
          ADD WAYPOINT
        </label>
        <input
          id={inputId}
          className={`system-search__input ${isSearching ? 'searching' : ''}`}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(results.length > 0)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `result-${activeIndex}` : undefined}
          aria-label="Search for a visited star system"
        />
      </div>

      {isOpen && (
        <ul
          id={listboxId}
          className="system-search__results"
          role="listbox"
          aria-label="Visited systems"
        >
          {results.map((system, index) => (
            <li
              id={`result-${index}`}
              key={system.name}
              className="system-search__result-item"
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={() => handleSelect(system)}
            >
              <span className="system-search__result-name">{system.name}</span>
              {system.coords && (
                <span className="system-search__result-coords" aria-label="Coordinates">
                  {system.coords.x.toFixed(1)} / {system.coords.y.toFixed(1)} / {system.coords.z.toFixed(1)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {!isOpen && query.length >= 2 && !isSearching && results.length === 0 && (
        <div className="system-search__no-results" role="status" aria-live="polite">
          No visited systems found for "{query}"
        </div>
      )}
    </div>
  );
}
