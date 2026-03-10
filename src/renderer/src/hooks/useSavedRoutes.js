import { useState, useCallback } from "react";

export function useSavedRoutes() {
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoutes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await window.electronAPI.listRoutes();
      if (result.success) {
        setSavedRoutes(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveRoute = useCallback(async (name, routeData) => {
    setError(null);
    try {
      const result = await window.electronAPI.saveRoute(name, routeData);
      if (result.success) {
        await fetchRoutes();
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [fetchRoutes]);

  const deleteRoute = useCallback(async (name) => {
    setError(null);
    try {
      const result = await window.electronAPI.deleteRoute(name);
      if (result.success) {
        await fetchRoutes();
        return true;
      } else {
        setError(result.error);
        return false;
      }
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [fetchRoutes]);

  const loadRoute = useCallback(async (name) => {
    setError(null);
    try {
      const result = await window.electronAPI.loadRoute(name);
      if (result.success) return result.data;
      setError(result.error);
      return null;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  return {
    savedRoutes,
    isLoading,
    error,
    fetchRoutes,
    saveRoute,
    deleteRoute,
    loadRoute,
  };
}