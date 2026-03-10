import { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';

export function useSystemSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const systems = await window.electronAPI.searchSystems(query);
        setResults(systems);
      } catch (err) {
        console.error('Search failed:', err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, results, isSearching };
}
