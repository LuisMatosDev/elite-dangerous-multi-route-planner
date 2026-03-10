import { useCallback } from 'react';
import { useAppContext } from '../store/AppContext';

export function useRoute() {
  const { state, dispatch } = useAppContext();

  const addWaypoint = useCallback((system) => {
    const waypoint = {
      id: `${system.name}-${Date.now()}`,
      system,
      label: system.name,
      visited: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_WAYPOINT', payload: waypoint });
  }, [dispatch]);

  const removeWaypoint = useCallback((id) => {
    dispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  }, [dispatch]);

  const reorderWaypoints = useCallback((fromIndex, toIndex) => {
    dispatch({ type: 'REORDER_WAYPOINTS', payload: { fromIndex, toIndex } });
  }, [dispatch]);

  const clearWaypoints = useCallback(() => {
    dispatch({ type: 'CLEAR_WAYPOINTS' });
  }, [dispatch]);

  const calculateDistances = useCallback(async (waypointsOverride) => {
    const waypoints = waypointsOverride || state.waypoints;
    if (waypoints.length < 1) return;

    try {
      const result = await window.electronAPI.calculateRoute(
        waypoints,
        parseFloat(state.currentShip?.jumpRange || 0)
      );

      dispatch({
        type: 'UPDATE_ROUTE',
        payload: {
          legs: result.legs,
          totalDistance: result.totalDistance,
          totalJumps: result.totalJumps,
          totalTime: result.totalTime,
        },
      });
    } catch (err) {
      console.error('[useRoute] calculateDistances failed:', err);
    }
  }, [state.waypoints, state.currentShip, dispatch]);

  const optimizeOrder = useCallback(async () => {
    if (state.waypoints.length < 3) return;

    try {
      const optimized = await window.electronAPI.optimizeRoute(state.waypoints);
      dispatch({ type: 'CLEAR_WAYPOINTS' });
      for (const waypoint of optimized) {
        dispatch({ type: 'ADD_WAYPOINT', payload: waypoint });
      }
      await calculateDistances(optimized);
    } catch (err) {
      console.error('[useRoute] optimizeOrder failed:', err);
    }
  }, [state.waypoints, dispatch, calculateDistances]);

  return {
    waypoints: state.waypoints,
    legs: state.legs,
    totalDistance: state.totalDistance,
    totalJumps: state.totalJumps,
    totalTime: state.totalTime,
    currentSystem: state.currentSystem,
    currentShip: state.currentShip,
    addWaypoint,
    removeWaypoint,
    reorderWaypoints,
    clearWaypoints,
    calculateDistances,
    optimizeOrder,
  };
}
