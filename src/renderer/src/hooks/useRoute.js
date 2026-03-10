import { useState, useCallback } from "react";
import { useAppContext } from "../store/AppContext";

export function useRoute() {
  const { state } = useAppContext();
  const [waypoints, setWaypoints] = useState([]);
  const [legs, setLegs] = useState([]);
  const [routeSummary, setRouteSummary] = useState(null);

  const addWaypoint = useCallback((system) => {
    setWaypoints((prev) => {
      if (prev.find((wp) => wp.system.name === system.name)) return prev;
      const newWp = {
        id: crypto.randomUUID(),
        system,
        label: null,
        visited: false,
        createdAt: new Date().toISOString(),
      };
      return [...prev, newWp];
    });
  }, []);

  const removeWaypoint = useCallback((id) => {
    setWaypoints((prev) => prev.filter((wp) => wp.id !== id));
    setLegs([]);
    setRouteSummary(null);
  }, []);

  const reorderWaypoints = useCallback((fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= waypoints.length) return;
    setWaypoints((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
    setLegs([]);
    setRouteSummary(null);
  }, [waypoints.length]);

  const clearWaypoints = useCallback(() => {
    setWaypoints([]);
    setLegs([]);
    setRouteSummary(null);
  }, []);

  const loadSavedRoute = useCallback((savedRoute) => {
    const restored = savedRoute.waypoints.map((wp) => ({
      id: wp.id || crypto.randomUUID(),
      system: wp.system,
      label: wp.label || null,
      visited: false,
      createdAt: wp.createdAt || new Date().toISOString(),
    }));
    setWaypoints(restored);
    setLegs([]);
    setRouteSummary(null);
  }, []);

  const calculateRoute = useCallback(async () => {
    if (waypoints.length === 0) return;
    try {
      const result = await window.electronAPI.calculateRoute(
        waypoints,
        state.jumpRange
      );
      if (result && result.legs) {
        setLegs(result.legs);
        setRouteSummary(result.summary);
      }
    } catch (err) {
      console.error("[useRoute] calculateRoute error:", err);
    }
  }, [waypoints, state.jumpRange]);

  const optimizeRoute = useCallback(async () => {
    if (waypoints.length < 3) return;
    try {
      const result = await window.electronAPI.optimizeRoute(waypoints);
      if (result && result.waypoints) {
        setWaypoints(result.waypoints);
        setLegs(result.legs || []);
        setRouteSummary(result.summary || null);
      }
    } catch (err) {
      console.error("[useRoute] optimizeRoute error:", err);
    }
  }, [waypoints]);

  return {
    waypoints,
    legs,
    routeSummary,
    addWaypoint,
    removeWaypoint,
    reorderWaypoints,
    clearWaypoints,
    loadSavedRoute,
    calculateRoute,
    optimizeRoute,
    jumpRange: state.jumpRange,
  };
}